const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
var net = require('net');
const path = require('node:path');
const fs = require('fs');
const { UI_MODES, IPC_MESSAGES } = require("./src/constants/constants.jsx");
const { convertSketchToImage, saveImageToFile } = require("./utils/imageUtil.js");
const { PersistentSocket } = require('./utils/persistentSocket.js');

var isWin = process.platform === "win32";

const arduinoSocket = new PersistentSocket('pixelsketch.local', 80);
let currentMode = UI_MODES.STANDALONE;
let currentSize = 16;

function handlePixelSketchArray(_event, data) {
  try {
    // console.log(`Writing ${data} to arduino`);
    arduinoSocket.write(data);
  } catch (exception) {
    console.log(`Failed to send arduino sketch: ${exception}`);
  }
}

const getFileSavePath = (extension, extensionName) => {
  let selectedSaveLocation = dialog.showSaveDialogSync({ defaultPath: 'new_sketch', filters: { name: extensionName, extensions: [extension] } });

  if (selectedSaveLocation === undefined) {
    return;
  }

  const pathDelimiter = isWin ? "\\" : "/";
  const saveLocation = selectedSaveLocation.split(pathDelimiter);

  let fileName = saveLocation.pop();

  if (fileName.includes(".")) {
    fileName = fileName.substring(0, fileName.lastIndexOf("."));
  }

  fileName += `.${extension}`;

  saveLocation.push(fileName);

  return (saveLocation.join(pathDelimiter));
}

const saveSketch = async (_event, sketch) => {
  const saveLocation = getFileSavePath('json', 'Sketch');

  if (!saveLocation) {
    return (
      {
        success: true
      }
    );
  }
  let success = false;

  try {
    fs.writeFileSync(saveLocation, sketch);
    success = true;
  } catch (err) {
    console.error(err);
  }

  return (
    {
      fileName: saveLocation,
      success
    }
  )
}

const saveSketchToImage = async (_event, sketch) => {
  const saveLocation = getFileSavePath('png', 'Image');

  if (!saveLocation) {
    return (
      {
        success: true
      }
    );
  }
  let success = false;

  try {
    const sketchData = JSON.parse(sketch);
    const image = convertSketchToImage(sketchData.sketch, sketchData.size, 1024);
    await saveImageToFile(image, saveLocation);
    success = true;
  } catch (err) {
    console.error(err);
  }

  return (
    {
      fileName: saveLocation,
      success
    }
  )
}

const getSavedSketch = () => {
  const selectedSketchLocation = dialog.showOpenDialogSync({ filters: [{ name: 'Sketches', extensions: ['json'] }] });

  if (!selectedSketchLocation) {
    return (
      {
        cancelled: true
      }
    )
  }

  try {
    const sketchData = JSON.parse(fs.readFileSync(selectedSketchLocation[0], 'utf8'));
    return sketchData;
  } catch (err) {
    return null;
  }
}

const createWindow = () => {
  if (require('electron-squirrel-startup')) app.quit();
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname + '/src/', 'preload.js')
    },
    icon: "./assets/round-pencil.ico",
    width: 900,
    height: 900
  });

  const ledArrayConnected = () => {
    win.webContents.send(IPC_MESSAGES.LED_ARRAY_STATUS_CHANGE, true);
  }

  const ledArrayDisconnected = () => {
    win.webContents.send(IPC_MESSAGES.LED_ARRAY_STATUS_CHANGE, false);
  }

  arduinoSocket.connectedCallback = ledArrayConnected;
  arduinoSocket.disconnectedCallback = ledArrayDisconnected;

  const setUiMode = (uiMode) => {
    if (currentMode === uiMode.mode && currentSize === uiMode.size) {
      return;
    }

    win.webContents.send(IPC_MESSAGES.SET_MODE, uiMode);

    if (currentMode === UI_MODES.LED_ARRAY) {
      arduinoSocket.destroy();
    }
    if (uiMode.mode === UI_MODES.LED_ARRAY) {
      arduinoSocket.connect();
    }

    currentMode = uiMode.mode;
    currentSize = uiMode.size;
  }

  const openSketch = () => {
    let sketchData = getSavedSketch();
    const { size, mode, sketch } = sketchData;

    if (sketchData.cancelled) {
      return;
    }

    if (!(size && mode && sketch)) {
      win.webContents.send(IPC_MESSAGES.OPEN_SKETCH, { success: false });
      return;
    }

    win.webContents.send(IPC_MESSAGES.OPEN_SKETCH, { ...sketchData, success: true });

    if (currentMode === mode && currentSize === size) {
      return;
    }

    if (currentMode === UI_MODES.LED_ARRAY) {
      arduinoSocket.destroy();
    }
    if (mode === UI_MODES.LED_ARRAY) {
      arduinoSocket.connect();
    }

    currentMode = mode;
    currentSize = size;
  }

  const clearSketch = () => {

    win.webContents.send(IPC_MESSAGES.CLEAR_SKETCH);
  }

  const generateRandomSketch = () => {

    win.webContents.send(IPC_MESSAGES.RANDOM_SKETCH);
  }

  const fillSketch = () => {
    win.webContents.send(IPC_MESSAGES.FILL_SKETCH);
  }

  const requestCurrentSketch = () => {
    win.webContents.send(IPC_MESSAGES.REQUEST_SKETCH);
  }

  const requestImageData = () => {
    win.webContents.send(IPC_MESSAGES.REQUEST_IMAGE_DATA);
  }

  // win.webContents.openDevTools()

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Save Sketch',
          click: requestCurrentSketch,
        },
        {
          label: 'Open Sketch',
          click: openSketch,
        },
        {
          label: 'Export to PNG',
          click: requestImageData
        }
      ]
    },
    {
      label: 'Mode',
      submenu: [
        {
          label: 'Stand Alone',
          submenu: [
            {
              label: '16x16',
              click: () => setUiMode({
                mode: UI_MODES.STANDALONE,
                size: 16
              }),
            },
            {
              label: '32x32',
              click: () => setUiMode({
                mode: UI_MODES.STANDALONE,
                size: 32
              }),
            },
            {
              label: '64x64',
              click: () => setUiMode({
                mode: UI_MODES.STANDALONE,
                size: 64
              }),
            },
            {
              label: '128x128',
              click: () => setUiMode({
                mode: UI_MODES.STANDALONE,
                size: 128
              }),
            }
          ]
        },
        {
          click: () => setUiMode({
            mode: UI_MODES.LED_ARRAY,
            size: 16
          }),
          label: 'LED Array'
        }
      ]
    },
    {
      label: 'Sketch',
      submenu: [
        {
          label: "Clear Sketch",
          click: clearSketch
        },
        {
          label: 'Random Sketch',
          click: generateRandomSketch
        },
        {
          label: "Fill Sketch",
          click: fillSketch
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.loadFile('build/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle(IPC_MESSAGES.SET_SKETCH, handlePixelSketchArray);
  ipcMain.handle(IPC_MESSAGES.SAVE_SKETCH, saveSketch);
  ipcMain.handle(IPC_MESSAGES.SAVE_IMAGE, saveSketchToImage);
  createWindow();
});

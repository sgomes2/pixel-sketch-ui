const { app, BrowserWindow, ipcMain, Menu, dialog, ipcRenderer } = require('electron')
var net = require('net');
const path = require('node:path');
const fs = require('fs');
const { UI_MODES, IPC_MESSAGES, TOAST_TYPES } = require("./src/constants/constants.jsx");
const { convertImageToSketch, convertSketchToImage, saveImageToFile } = require("./utils/imageUtil.js");
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

  const openSketch = (newSketchData) => {

    let sketchData = newSketchData ? newSketchData : getSavedSketch();
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
    dialog.showMessageBox(win, {
      title: "Clear Sketch",
      message: "Are you sure you want to clear the current sketch?",
      buttons: ["Cancel", "Yes"],
      type: "question",
    }).then((action) => {
      if (action.response !== 0) {
        win.webContents.send(IPC_MESSAGES.CLEAR_SKETCH);
      }
    });
  }

  const generateRandomSketch = () => {
    dialog.showMessageBox(win, {
      title: "Open SKetch",
      message: "Are you sure you want to generate a random sketch? This will erase the current sketch.",
      buttons: ["Cancel", "Yes"],
      type: "question",
    }).then((action) => {
      if (action.response !== 0) {
        win.webContents.send(IPC_MESSAGES.RANDOM_SKETCH);
      }
    });
  }

  const fillSketch = async () => {
    dialog.showMessageBox(win, {
      title: "Fill SKetch",
      message: "Are you sure you want to fill the sketch with the selected color? This will erase the current sketch.",
      buttons: ["Cancel", "Yes"],
      type: "question",
    }).then((action) => {
      if (action.response !== 0) {
        win.webContents.send(IPC_MESSAGES.FILL_SKETCH);
      }
    })
  }

  const handleImageImport = () => {
    const imageLocation = dialog.showOpenDialogSync({ filters: [{ name: 'Images', extensions: ['png', 'jpeg', 'jpg'] }] });

    if (!imageLocation) {
      return (
        {
          cancelled: true
        }
      )
    }

    const sketchSizes = ["16x16", "32x32", "64x64", "128x128"]
    win.webContents.send(IPC_MESSAGES.SHOW_TOAST, { type: TOAST_TYPES.INFO, message: `Loading ${imageLocation[0]}` });
    dialog.showMessageBox(win, {
      title: "Import Image",
      message: "Are you sure you want to import an image? This will erase the current sketch.",
      detail: "Images will mostly likely need to be resized in order to fit the sketch. Quality may be degraded.",
      buttons: ["Cancel", ...sketchSizes],
      type: "question",
    }).then(async (action) => {
      if (action.response !== 0) {
        const size = 2 ** (action.response + 3);
        const sketch = await convertImageToSketch(imageLocation[0], size);

        if (sketch.failure) {
          win.webContents.send(IPC_MESSAGES.SHOW_TOAST, { success: false, message: "Failed to import picture" });
          return;
        }

        openSketch({
          size,
          mode: UI_MODES.STANDALONE,
          sketch
        })
      }
    })
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
          click: () => {
            dialog.showMessageBox(win, {
              title: "Open SKetch",
              message: "Are you sure you want to open a new sketch? This will erase the current sketch.",
              buttons: ["Cancel", "Yes"],
              type: "question",
            }).then((action) => {
              if (action.response !== 0) {
                openSketch();
              }

            });
          },
        },
        {
          label: 'Export to PNG',
          click: requestImageData
        },
        {
          label: 'Import Picture',
          click: handleImageImport
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

const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
var net = require('net');
const path = require('node:path');
const { UI_MODES } = require("./src/constants/constants.jsx")

// let variableSize = false;

function handlePixelSketchArray(data) {
  console.log(`Recieved new LED sketch: ${data}`);
  try {
    var client = new net.Socket();
    console.log("Writing new sketch to LED array");
    client.connect(80, 'pixelsketch.local', function () {
      client.write(data);
      client.destroy();
    });
  } catch (exception) {
    console.log(`Failed to send arduino sketch: ${exception}`);
  }
}

const saveSketch = (sketch) => {
  const saveLocation = dialog.showSaveDialogSync();

  console.log(`Saving ${JSON.stringify(sketch)} to ${saveLocation}`);
  // win.webContents.send('save-sketch');
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

  win.webContents.openDevTools()

  const setUiMode = (uiMode) => {

    win.webContents.send('set-mode', uiMode);
  }

  const clearSketch = () => {

    win.webContents.send('clear-sketch');
  }

  const generateRandomSketch = () => {

    win.webContents.send('random-sketch');
  }

  const requestCurrentSketch = () => {
    win.webContents.send('request-sketch');
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Save Sketch',
          click: requestCurrentSketch,
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
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.loadFile('build/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('set-sketch', (event, array) => handlePixelSketchArray(array));
  ipcMain.handle('save-sketch', (event, sketch) => saveSketch(sketch));
  createWindow();
});

// const setVariableSize = (enable) => {
//   Menu.getApplicationMenu().getMenuItemById("size").enabled = enable;
// }
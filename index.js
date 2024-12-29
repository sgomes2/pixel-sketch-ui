const { app, BrowserWindow, ipcMain, Menu } = require('electron')
var net = require('net');
const path = require('node:path');
const { UI_MODES } = require("./src/constants/constants.jsx")

function handlePixelSketchArray(data) {
  console.log('Recieved new LED sketch')
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

  const menu = Menu.buildFromTemplate([
    {
      label: 'Mode',
      submenu: [
        {
          click: () => win.webContents.send('set-mode', UI_MODES.STANDALONE),
          label: 'Stand Alone'
        },
        {
          click: () => win.webContents.send('set-mode', UI_MODES.LED_ARRAY),
          label: 'LED Array'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.loadFile('build/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('set-sketch', handlePixelSketchArray)
  createWindow()
})
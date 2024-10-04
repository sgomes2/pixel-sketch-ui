// electron.js
const { app, BrowserWindow, ipcMain } = require('electron');
const { IPC_MESSAGES } = require('./src/constants/constants.jsx');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path
    },
  });

  const startURL = 'http://localhost:3000';

  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
}

function handleUpdateLedGrid (event, gridValues) {
  console.log(`Recieved Grid Values: ${gridValues}`);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.on(IPC_MESSAGES.UPDATE_LEDS, handleUpdateLedGrid)
})
const { app, BrowserWindow, ipcMain } = require('electron')
var net = require('net');

function handlePixelSketchArray(event, data) {
  var client = new net.Socket();
  client.connect(80, 'pixelsketch.local', function () {
    // console.log('Arduino Connected');
    // console.log(`Sending: ${data}`);
    client.write(data);
    client.destroy();
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 900,
    height: 900
  })

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  ipcMain.on('set-sketch', handlePixelSketchArray)
  createWindow()
})
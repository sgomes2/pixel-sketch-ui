const { app, BrowserWindow, ipcMain } = require('electron')
var net = require('net');

function handlePixelSketchArray(event, data) {
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
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 900,
    height: 900
  });

  win.setMenuBarVisibility(false)

  win.loadFile('build/index.html')
}

app.whenReady().then(() => {
  ipcMain.on('set-sketch', handlePixelSketchArray)
  createWindow()
})
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onSetMode: (callback) => ipcRenderer.on('set-mode', (_event, mode) => { callback(mode) }),
    updateLedArray: (array) => ipcRenderer.invoke('set-sketch', array)
})
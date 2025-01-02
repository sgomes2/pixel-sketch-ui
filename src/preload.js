const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onSetMode: (callback) => ipcRenderer.on('set-mode', (_event, mode) => { callback(mode) }),
    onClearSketch: (callback) => ipcRenderer.on('clear-sketch', () => { callback() }),
    onRandomSketch: (callback) => ipcRenderer.on('random-sketch', () => { callback() }),
    updateLedArray: (array) => ipcRenderer.invoke('set-sketch', array),

})
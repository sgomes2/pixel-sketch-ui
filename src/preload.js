const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onSetMode: (callback) => ipcRenderer.on('set-mode', (_event, mode) => { callback(mode) }),
    onOpenSketch: (callback) => ipcRenderer.on('open-sketch', (_event, sketch) => { callback(sketch) }),
    onClearSketch: (callback) => ipcRenderer.on('clear-sketch', () => { callback() }),
    onRandomSketch: (callback) => ipcRenderer.on('random-sketch', () => { callback() }),
    onRequestSketch: (callback) => ipcRenderer.on('request-sketch', () => { callback() }),
    updateLedArray: (array) => ipcRenderer.invoke('set-sketch', array),
    saveSketch: (sketch) => ipcRenderer.invoke('save-sketch', sketch),
})
const { IPC_MESSAGES } = require('./constants/constants.jsx')
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onSetMode: (callback) => ipcRenderer.on(IPC_MESSAGES.SET_MODE, (_event, mode) => { callback(mode) }),
    onOpenSketch: (callback) => ipcRenderer.on(IPC_MESSAGES.OPEN_SKETCH, (_event, sketch) => { callback(sketch) }),
    onClearSketch: (callback) => ipcRenderer.on(IPC_MESSAGES.CLEAR_SKETCH, () => { callback() }),
    onFillSketch: (callback) => ipcRenderer.on(IPC_MESSAGES.FILL_SKETCH, () => { callback() }),
    onRandomSketch: (callback) => ipcRenderer.on(IPC_MESSAGES.RANDOM_SKETCH, () => { callback() }),
    onRequestSketch: (callback) => ipcRenderer.on(IPC_MESSAGES.REQUEST_SKETCH, () => { callback() }),
    onRequestImageData: (callback) => ipcRenderer.on(IPC_MESSAGES.REQUEST_IMAGE_DATA, () => { callback() }),
    onShowToast: (callback) => ipcRenderer.on(IPC_MESSAGES.SHOW_TOAST, (_event, params) => { callback(params) }),
    onLedArrayStatusChange: (callback) => ipcRenderer.on(IPC_MESSAGES.LED_ARRAY_STATUS_CHANGE, (_event, connected) => { callback(connected) }),
    updateLedArray: (array) => ipcRenderer.invoke(IPC_MESSAGES.SET_SKETCH, array),
    saveSketch: (sketch) => ipcRenderer.invoke(IPC_MESSAGES.SAVE_SKETCH, sketch),
    saveImage: (sketch) => ipcRenderer.invoke(IPC_MESSAGES.SAVE_IMAGE, sketch),
    removeAllListeners: () => {
        ipcRenderer.removeAllListeners(IPC_MESSAGES.SET_MODE);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.OPEN_SKETCH);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.CLEAR_SKETCH);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.RANDOM_SKETCH);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.REQUEST_SKETCH);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.REQUEST_IMAGE_DATA);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.LED_ARRAY_STATUS_CHANGE);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.FILL_SKETCH);
        ipcRenderer.removeAllListeners(IPC_MESSAGES.SHOW_TOAST);
    },
});
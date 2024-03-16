const electron = require('electron');

const { contextBridge, ipcRenderer } = electron;


contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile')
});
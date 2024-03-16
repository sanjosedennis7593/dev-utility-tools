"use strict";
const require$$0 = require("electron");
var preload = {};
const electron = require$$0;
const { contextBridge, ipcRenderer } = electron;
contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile")
});
module.exports = preload;

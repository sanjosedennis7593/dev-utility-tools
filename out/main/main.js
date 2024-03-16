"use strict";
const electron = require("electron");
const path = require("node:path");
const url = require("url");
if (typeof electron === "string") {
  throw new TypeError("Not running in an Electron environment!");
}
const { env } = process;
const isEnvSet = "ELECTRON_IS_DEV" in env;
const getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
const isDev$1 = isDev;
const devMode = electron.app.isPackaged ? false : isDev$1;
let mainWindow;
const __customFileName = url.fileURLToPath(require("url").pathToFileURL(__filename).href);
const __customDirName = path.dirname(__customFileName);
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    center: true,
    minWidth: 1e3,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__customDirName, "../preload/preload.cjs"),
      sandbox: false
      // nodeIntegration: false,
      // contextIsolation: true
    }
  });
  if (devMode) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__customDirName, `../renderer/index.html`));
  }
  mainWindow.on("closed", () => mainWindow = null);
}
electron.app.whenReady().then(() => {
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});

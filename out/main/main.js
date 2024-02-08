import { app, BrowserWindow } from "electron";
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    minWidth: 1e3,
    minHeight: 600
  });
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => mainWindow = null);
}
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});

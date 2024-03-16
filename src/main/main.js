import { app, BrowserWindow } from 'electron';
// import path from 'path';
import isDev from 'electron-is-dev';
import path, { join } from 'node:path';
import { fileURLToPath } from 'url';

const devMode = app.isPackaged ? false : isDev;

let mainWindow;

const __customFileName = fileURLToPath(import.meta.url);

const __customDirName = path.dirname(__customFileName);

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      preload: join(__customDirName, '../preload/preload.cjs'),
      sandbox: false
    }
  });

  if(devMode) {
    mainWindow.loadURL('http://localhost:5173');
  }
  else {
    mainWindow.loadFile(path.join(__customDirName, `../renderer/index.html`));
  }
 
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
const { app, BrowserWindow, ipcMain, autoUpdater, dialog, } = require("electron");
const { Notification, shell } = require('electron');
const path = require("path");
const { updateElectronApp } = require('update-electron-app');

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 6000);

updateElectronApp(); // additional configuration options available

const os = require("os-utils");
const os_node = require("node:os");
const si = require("systeminformation");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  console.log(os_node.cpus());
  ipcMain.handle("info", () => os_node.cpus());
  ipcMain.handle("cpu", async () => {
    os.cpuUsage(function (v) {
      console.log("CPU Usage (%): " + v);
      return v;
    });
  });
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("getCpuTemperature", async () => {
    try {
      return await si.cpuTemperature();
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  ipcMain.handle('showNotification', (event, data) => {
    const notification = new Notification({
      title: data.title,
      body: data.body,
    });

    notification.show();
  });
  ipcMain.handle('openParameters', () => {
    shell.openExternal('x-apple.systempreferences:com.apple.preference.notifications').then(r => console.log(r));
  });
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "Application Update",
    message: process.platform === "darwin" ? releaseNotes : releaseName,
    detail:
        "A new version has been downloaded. Restart the application to apply the updates.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

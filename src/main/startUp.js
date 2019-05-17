import { app, BrowserWindow, globalShortcut } from "electron";
import { isProd } from "./utils";

export default function startUp() {
  return new Promise((resolve, reject) => {
    let mainWindow = null;
    let port = process.env.DEV_PORT || 8080;
    let isQuiting;

    const createWindow = () => {
      mainWindow = new BrowserWindow({
        width: 1096,
        height: 685,
        show: false
      });

      const winURL =
        process.env.NODE_ENV === "production"
          ? `file://${__dirname}/index.html`
          : `http://localhost:${port}`;
      mainWindow.loadURL(winURL);
      // mainWindow.openDevTools();
      mainWindow.webContents.on("did-finish-load", () => {
        if (!mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }

        mainWindow.show();
        mainWindow.focus();
        resolve();
      });

      mainWindow.on("minimize", function(event) {
        event.preventDefault();
        mainWindow.hide();
      });

      mainWindow.on("close", function(event) {
        if (isProd) {
          if (!isQuiting) {
            event.preventDefault();
            console.log("app 未退出，转入隐藏");
            mainWindow.hide();
            return false;
          }
        } else {
          mainWindow = null;
        }
      });
    };

    app.on("before-quit", function() {
      isQuiting = true;
    });

    app.on("activate", () => {
      if (mainWindow) {
        mainWindow.show();
      } else {
        createWindow();
      }
    });

    app.on("ready", () => {
      // 生成模式，用于调试
      globalShortcut.register("CommandOrControl+Shift+L", () => {
        let focusWin = BrowserWindow.getFocusedWindow();
        focusWin && focusWin.toggleDevTools();
      });

      createWindow();
    });

    app.on(
      "window-all-close",
      () => process.platform !== "darwin" && app.quit()
    );
  });
}

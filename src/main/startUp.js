import { app, BrowserWindow } from "electron";

export default function startUp() {
  return new Promise((resolve, reject) => {
    let mainWindow = null;
    let port = process.env.DEV_PORT || 8080;

    app.on("ready", () => {
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

      mainWindow.on("close", () => (mainWindow = null));
    });

    app.on(
      "window-all-close",
      () => app.quit() // process.platform !== "darwin" &&
    );
  });
}

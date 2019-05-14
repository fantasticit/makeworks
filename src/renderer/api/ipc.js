import { ipcRenderer } from "electron";

export default function ipc(type, arg) {
  return new Promise((resolve, reject) => {
    ipcRenderer.once("success", (_, arg) => {
      resolve(arg);
    });

    ipcRenderer.once("error", (_, arg) => {
      document.write(e.message || e);
      reject(e);
    });

    ipcRenderer.send(type, arg);
  });
}

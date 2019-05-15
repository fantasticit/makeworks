import { shell } from "electron";
import { exec } from "child_process";

let workerProcess = null;
let noop = () => {};

export function runExec({
  command,
  onData = noop,
  onError = noop,
  onClose = noop
}) {
  workerProcess = exec(command);
  workerProcess.stdout.on("data", onData);
  workerProcess.stdout.on("error", onError);
  workerProcess.stdout.on("close", onClose);
}

export function openTerminal(terminal, command) {
  let wrapped = null;

  switch (terminal.title) {
    case "iTerm":
      wrapped = [
        `osascript -e 'tell application "iTerm" to activate'`,
        `-e 'tell application "System Events" to tell process "iTerm" to keystroke "t" using command down'`
      ].join("");
      break;

    case "Terminal":
    default:
      wrapped = `osascript -e 'tell app "Terminal"
        do script "${command}"
      end tell'
      `;
      break;
  }

  return runExec({ command: wrapped });
}

/**
 * 在文件资源管理器中打开文件
 * @param {*} path
 */
export function openFileFolder(path) {
  shell.showItemInFolder(path);
}

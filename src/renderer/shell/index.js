import { shell } from "electron";
import { exec } from "child_process";
import logo from "../assets/logo.png";

let workerProcess = null;
let noop = () => {};

export function runExec({
  command,
  onData = noop,
  onError = noop,
  onClose = noop,
  onExit = noop
}) {
  workerProcess = exec(command);

  workerProcess.once("exit", onExit);
  workerProcess.once("error", onError);

  workerProcess.stdout.on("data", onData);
  workerProcess.stdout.on("error", onError);
  workerProcess.stdout.on("close", onClose);
}

export function notify({ title, ...other }) {
  return new Notification(title, { ...other });
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

  return runExec({
    command: wrapped,
    onData: () =>
      notify({ title: "终端打开成功", body: `执行命令: ${command}` }),
    onError: e =>
      notify({ title: "终端打开失败", body: `错误信息：${e.message || e}` })
  });
}

/**
 * 在文件资源管理器中打开文件
 * @param {*} path
 */
export function openFileFolder(path) {
  shell.showItemInFolder(path);
  notify({ title: `文件打开成功`, body: `路径: ${path}` });
}

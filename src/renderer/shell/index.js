import { shell, clipboard } from "electron";
import { get as exec } from "node-cmd";

let noop = () => {};

export function runExec({
  command,
  onData = noop,
  onError = noop,
  onExit = noop,
  onClose = noop
}) {
  exec(command, function(err, data, stderr) {
    onClose();

    if (err) {
      onError(err);
    } else {
      onData(data);
      onClose();
      onExit();
    }
  });
}

export function copy(value) {
  if (!value) {
    return;
  }

  clipboard.writeText(value);
  notify({ title: "复制成功", body: "已成功复制文字到剪切板" });
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

import { shell, clipboard } from "electron";
import shelljs from "shelljs";

let nodePath = shelljs.which("node").toString();
shelljs.config.execPath = nodePath;

console.info("shelljs 执行路径", nodePath);

let noop = () => {};

export const EXEC_LOG_STACK = []; // 运行日志

export function clearExecLog() {
  EXEC_LOG_STACK = [];
}

export function runExec({
  command,
  onData = noop,
  onWarning = noop,
  onError = noop,
  onExit = noop,
  onClose = noop
}) {
  let now = new Date();
  now = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  shelljs.exec(command, function(code, stdout, stderr) {
    onClose();

    if (stderr && code !== 0) {
      onError(stderr);
      console.error("执行命令出错", command, code, stderr);
      EXEC_LOG_STACK.push({
        time: now,
        command,
        status: "failed",
        info: stderr,
        code
      });
    } else {
      onData(stdout);
      onWarning(stderr);
      onExit();
      EXEC_LOG_STACK.push({
        time: now,
        command,
        status: "ok",
        info: stdout,
        code
      });
      console.log("执行命令结束", command, code, stdout);
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

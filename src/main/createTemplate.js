import { ipcMain } from "electron";
import { homedir } from "os";
import fs from "fs-extra";
import path from "path";
import url from "url";
import { TEMPLATE_PROCESSES } from "./pool";

const homePath = homedir();

export function downloadTemplate(template, projectName, projectPath) {
  const templatePath = path.resolve(
    __dirname,
    "../resource/templates/" + template
  );
  projectPath = path.join(homePath, projectPath, projectName);
  return new Promise(async (resolve, reject) => {
    try {
      await fs.ensureDir(projectPath);
      await fs.copy(templatePath, projectPath);
      resolve({
        projectName,
        projectPath,
        templateName: template,
        templatePath
      });
    } catch (e) {
      reject(e);
    }
  });
}

ipcMain.on("create:template", async (evt, arg) => {
  const { template: templateName, projectName, projectPath } = arg;

  try {
    const ret = await downloadTemplate(templateName, projectName, projectPath);
    TEMPLATE_PROCESSES[projectName] = ret;
    evt.sender.send("success", ret);
  } catch (e) {
    evt.sender.send("error", e);
  }
});

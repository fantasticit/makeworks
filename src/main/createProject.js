import { homedir } from "os";
import fs from "fs-extra";
import path from "path";
import { getTime } from "./utils";

const homePath = homedir();

/**
 * 创建新项目
 *
 * @export
 * @param {*} template { dirname: 模板所在文件夹名, path: 模板源文件所在路径 }
 * @param {*} project { name: 项目名称, path: 项目路径 }
 * @returns
 */
export default function createProject(template, project) {
  let { dirname: templateName, path: templatePath } = template;
  let { name: projectName, path: projectPath } = project;

  projectPath = path.join(homePath, projectPath, projectName);

  return new Promise(async (resolve, reject) => {
    try {
      await fs.ensureDir(projectPath);
      await fs.copy(templatePath, projectPath);
      resolve({
        ...project,
        path: projectPath,
        template,
        createAt: getTime()
      });
    } catch (e) {
      reject(e);
    }
  });
}

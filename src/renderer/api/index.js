import ipc from "./ipc";

export function deleteFile(path) {
  return ipc("delete:file", path);
}

export function getTemplates() {
  return ipc("get:templates");
}

/**
 * 创建新页面
 * @param {*} arg
 */
export function createProject(arg) {
  return ipc("create:project", arg);
}

/**
 * 获取新建项目的信息
 * @param {*} project
 */
export function getProjectInfo(project) {
  return ipc("project:info", project);
}

/**
 * 为新项目新建页面
 * @param {*} page
 */
export function createPageForProject(page) {
  return ipc("project:createPage", page);
}

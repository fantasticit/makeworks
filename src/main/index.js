import { ipcMain } from "electron";
import createProject from "./createProject";
import readTemplates from "./templateServer";
import ProjectManager from "./ProjectManager";
import startUp from "./startUp";

startUp().then(() => {
  let templates = [];
  (async () => {
    try {
      templates = await readTemplates();
    } catch (e) {
      console.error("读取模板出错", e);
    }
  })();

  // 读取模板
  ipcMain.on("get:templates", async evt => {
    try {
      evt.sender.send("success", templates);
    } catch (e) {
      evt.sender.send("error", e);
    }
  });

  // 创建新项目
  ipcMain.on("create:project", async (evt, arg) => {
    const { template, project } = arg;

    try {
      const ret = await createProject(template, project);
      evt.sender.send("success", ret);
    } catch (e) {
      console.error("新建项目失败", e);
      evt.sender.send("error", e);
    }
  });

  // 项目管理
  const pool = new Map();

  const getManager = path => {
    let manager = null;

    if (pool.has(path)) {
      manager = pool.get(path);
    } else {
      manager = new ProjectManager();
      manager.setRootPath(path);
      pool.set(path, manager);
    }

    return manager;
  };

  // 获取项目信息
  ipcMain.on("project:info", async (evt, arg) => {
    const { path } = arg;

    try {
      let manager = getManager(path);
      let json = manager.getPkgJSON();
      let pages = await manager.getDirInfo("pages");

      evt.sender.send("success", {
        dependencies: json.dependencies || [],
        devDependencies: json.devDependencies || [],
        pages
      });
    } catch (e) {
      console.log("读取项目信息失败", e);
      evt.sender.send("error", e);
    }
  });

  ipcMain.on("project:createPage", async (evt, arg) => {
    try {
      let manager = getManager(arg.path);
      await manager.generateNewPage(arg);
      evt.sender.send("success");
    } catch (e) {
      console.log("为项目新建页面失败", e);
      evt.sender.send("error", e);
    }
  });
});

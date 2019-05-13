import { ipcMain } from "electron";
import fs from "fs-extra";
import path from "path";

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 读取指定文件夹下所有文件名及路径
 * @param {*} filePath
 */
function readDirContents(filePath) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      resolve([]);
    } else {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            files.map(fileName => ({
              filePath: path.join(filePath, filename),
              fileName
            }))
          );
        }
      });
    }
  });
}

/**
 * 读取项目 package.json
 * @param {*} projectPath
 */
function readPkgJSONInfo(projectPath) {
  let pkgJSONFilePath = path.join(projectPath, "package.json");
  return fs.readJson(pkgJSONFilePath);
}

async function generatePageForProject({ project, page }) {
  const { projectPath } = project;
  const { pageName, pagePath, data } = page;

  const srcPath = path.join(projectPath, "src");
  const pagesPath = path.join(srcPath, "/pages");
  const newPagePath = path.join(pagesPath, "/" + pageName);
  const componentsPath = path.join(newPagePath, "/components");

  await fs.ensureDir(srcPath); // 0. 确认 src 目录存在
  await fs.ensureDir(pagesPath); // 1. 确认 pages 目录存在
  await fs.ensureDir(newPagePath); // 2. 创建新页面
  await fs.ensureDir(componentsPath); // 3. 为新页面创建 componets 目录

  // 新页面所用到的组件
  let components = [];
  const getComponents = data => {
    data.forEach(d => {
      const { type, children } = d;
      components.push(capitalize(type));

      if (children && children.length) {
        getComponents(children);
      }
    });
  };
  getComponents(data);
  components = [...new Set(components)];

  const generateComponentFile = async componentName => {
    const componentPath = path.join(componentsPath, "/" + componentName);
    await fs.ensureDir(componentPath); // 创建组件文件夹

    let componentSourcePath = path.resolve(
      __dirname,
      `../resource/components/${componentName}.js`
    );

    if (!fs.existsSync(componentSourcePath)) {
      componentName = path.resolve(
        __dirname,
        `../resource/components//${componentName}/index.js`
      );
    }

    if (!fs.existsSync(componentSourcePath)) {
      console.error("找不到 组件 源文件");
    }

    console.log(componentPath, componentSourcePath, "/r/n");

    await fs.copy(componentSourcePath, componentPath + "/index.js");
  };

  components.map(generateComponentFile);

  // 新页面 index.js 内容
  const generateRenderJSX = (type, props, children, spaces = 6) => {
    delete props.children;
    let str = `<${type} {...${JSON.stringify(props, null, spaces)}}>`;

    if (children && children.length) {
      children.map(child => {
        const { type, props, children } = child;
        str += generateRenderJSX(type, props, children, (spaces += 2));
      });
    }
    str += `</${type}>`;
    return str;
  };

  const pageIndexFileContent = `
    import React from 'react';
    ${components
      .map(c => `import {${c}} from './components/${c}'`)
      .join(";\r\n")}


    export default class ${pageName} extends React.Component {
      render () {
        return (
          <div>
        ${data
          .map(d => {
            const { type, props, children } = d;
            return generateRenderJSX(type, props, children);
          })
          .join("")}
        </div>
        )
      }
    }
  `;

  await fs.outputFile(
    path.join(newPagePath, "/index.js"),
    pageIndexFileContent
  );
}

ipcMain.on("read:package", async (evt, arg) => {
  const projectPath = arg.projectPath;

  try {
    const pkgJSON = await readPkgJSONInfo(projectPath);
    const layouts = await readDirContents(path.join(projectPath, "layouts"));
    const components = await readDirContents(
      path.join(projectPath, "components")
    );
    const pages = await readDirContents(path.join(projectPath, "pages"));

    evt.sender.send("success", { pkgJSON, layouts, components, pages });
  } catch (e) {
    console.log("error", e);
    evt.sender.send("error", e);
  }
});

ipcMain.on("generate:page", async (evt, arg) => {
  try {
    await generatePageForProject(arg);
    evt.sender.send("success", "创建成功");
  } catch (e) {
    console.log("error", e);
    evt.sender.send("error", e);
  }
});

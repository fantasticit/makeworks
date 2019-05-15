import fs from "fs-extra";
import { join, resolve } from "path";
import { capitalize } from "../shared/utils";
import { isProd, readDir } from "./utils";

const source = require("../../package.json");

const componentsRootPath = isProd
  ? resolve(__dirname, "../../src/resource/components/")
  : resolve(__dirname, `../resource/components/`);

export default class ProjectManager {
  constructor() {
    this.rootPath = null; // 项目根目录
  }

  /**
   * 设置项目跟路径
   *
   * @param {*} path
   * @memberof ProjectManager
   */
  setRootPath(path) {
    this.rootPath = path;
  }

  /**
   * 获取项目 package.json 内容
   *
   * @memberof ProjectManager
   */
  getPkgJSON() {
    const file = join(this.rootPath, "./package.json");
    return fs.readJsonSync(file);
  }

  /**
   * 更新项目 package.json 内容
   *
   * @memberof ProjectManager
   */
  updatePkgJSON(patch = {}) {
    const info = this.getPkgJSON();
    Object.assign(info, patch);
    const file = join(this.rootPath, "./package.json");
    return fs.writeJsonSync(file, info);
  }

  /**
   * 读取项目指定文件夹下所有文件
   *
   * @param {*} dir
   * @memberof ProjectManager
   */
  getDirInfo(dir) {
    const file = join(this.rootPath, `./src/${dir}`);
    return readDir(file);
  }

  /**
   * 为项目新页面生成 index.js 文件
   *
   * @param {*} pageName 新页面名称                 *
   * @param {*} components 新页面所用到的组件类型
   * @param {*} data 新页面所用到的组件
   * @param {*} pagePath 新页面根路径，例如: /workspace/project/src/pages/page1/
   * @memberof ProjectManager
   */
  async _createNewPageIndexFile(pageName, components, data, rootPath) {
    // 新页面 index.js 内容
    const generateRenderJSX = (
      type,
      props = null,
      children = null,
      spaces = 6
    ) => {
      props && delete props.children;
      let str = !props
        ? `<${type} />`
        : `<${type} {...${JSON.stringify(props, null, spaces)}}>`;
      if (children && children.length) {
        children.map(child => {
          const { type, props, children } = child;
          str += generateRenderJSX(type, props, children, (spaces += 2));
        });
      }
      str += `</${type}>`;
      return str;
    };

    const content = `
import React from 'react';
${components.map(c => `import {${c}} from './components/${c}'`).join(";\r\n")}

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

    await fs.outputFile(join(rootPath, "/index.js"), content);
  }

  /**
   * 为项目新页面生成 组件目录
   *
   * @param {*} components 新页面所用到的 组件
   * @param {*} rootPath 新页面组件根路径，例如: /workspace/project/src/pages/page1/components/
   * @returns
   * @memberof ProjectManager
   */
  async _createNewPageComponentFiles(components, rootPath) {
    const generateComponentFile = async componentName => {
      const componentPath = join(rootPath, "/" + componentName);
      await fs.ensureDir(componentPath); // 创建组件文件夹

      let componentSourcePath = join(
        componentsRootPath,
        `./${componentName}.js`
      );

      if (!fs.existsSync(componentSourcePath)) {
        componentName = join(componentsRootPath, `./${componentName}/index.js`);
      }

      if (!fs.existsSync(componentSourcePath)) {
        throw new Error(`找不到项目所需组件 ${componentName} 源文件`);
      }

      await fs.copy(componentSourcePath, componentPath + "/index.js");
    };

    return components.map(generateComponentFile);
  }

  /**
   * 为项目生成新的页面
   *
   * @param {*} page
   * @memberof ProjectManager
   */
  async generateNewPage(page) {
    // router: 新页面的路由配置
    // name: 新页面文件夹名称
    // components: 新页面用到的组件
    const { router, name: pageName, components: data } = page;

    const srcPath = join(this.rootPath, "src");
    const pagesPath = join(srcPath, "/pages");
    const pageDirPath = join(pagesPath, "/" + pageName);
    const componentsPath = join(pageDirPath, "/components");

    await fs.ensureDir(srcPath); // 0. 确认 src 目录存在
    await fs.ensureDir(pagesPath); // 1. 确认 pages 目录存在
    await fs.ensureDir(pageDirPath); // 2. 创建新页面
    await fs.ensureDir(componentsPath); // 3. 为新页面创建 componets 目录

    // 遍历新页面所用到的组件，提取组件类型
    let components = [];
    let dependencies = [];
    const getComponents = data => {
      if (!data) {
        return [];
      }

      data.forEach(d => {
        const { type, children, info } = d;

        if (info.dependencies) {
          dependencies.push.apply(dependencies, info.dependencies);
        }

        components.push(capitalize(type));
        if (children && children.length) {
          getComponents(children);
        }
      });
    };
    getComponents(data);
    components = [...new Set(components)];
    dependencies = [...new Set(dependencies)];

    await this._createNewPageIndexFile(pageName, components, data, pageDirPath);
    await this._createNewPageComponentFiles(components, componentsPath);
    this.updateDependencies(dependencies);
  }

  updateDependencies(dependencies) {
    const json = this.getPkgJSON();
    const target = source.dependencies;
    let newInfo = Object.assign(
      {},
      json.dependencies,
      dependencies.reduce((a, c) => {
        a[c] = target[c];
        return a;
      }, Object.create(null))
    );
    newInfo && this.updatePkgJSON({ dependencies: newInfo });
  }

  /**
   * 更新项目路由
   *
   * @memberof ProjectManager
   */
  updateReactRouter() {}
}

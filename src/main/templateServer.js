import fs from "fs-extra";
import path from "path";
import { isProd } from "./utils";

const rootPath = isProd
  ? path.resolve(__dirname, "../../src/resource/templates/")
  : path.resolve(__dirname, "../resource/templates/");

export default function() {
  return new Promise((resolve, reject) => {
    fs.readdir(rootPath, (err, dirs) => {
      if (err) {
        reject(`读取模板文件失败！读取路径 ${rootPath}`);
      }

      dirs = dirs || [];

      const templates = dirs
        .filter(d => !/^\./.test(d))
        .map(dir => {
          let infoPath = path.join(rootPath, dir, "makeworks.json");

          if (!fs.existsSync(infoPath)) {
            infoPath = path.join(rootPath, dir, "package.json");
          }

          if (!fs.existsSync(infoPath)) {
            return null;
          }

          const info = fs.readJsonSync(infoPath);
          return {
            dirname: dir,
            path: path.join(rootPath, dir),
            title: info.title,
            description: info.description,
            cover: info.cover
          };
        });

      resolve(templates.filter(Boolean));
    });
  });
}

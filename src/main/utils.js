import fs from "fs-extra";
import path from "path";

export function getTime() {
  const now = new Date();
  const f = n => (n < 10 ? "0 " + n : n);

  return `${now.getFullYear()}年${now.getMonth()}月${now.getDate()}日 ${f(
    f(now.getHours())
  )}:${f(now.getMinutes())}`;
}

/**
 * 读取指定文件夹下所有文件名及路径
 * @param {*} filePath
 */
export function readDir(filePath) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      resolve([]);
    } else {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          files = files || [];

          resolve(
            files
              .filter(d => !/^\./.test(d))
              .map(fileName => ({
                path: path.join(filePath, fileName),
                name: fileName
              }))
          );
        }
      });
    }
  });
}

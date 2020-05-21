// NOTE: see https://astexplorer.net/
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function isDirectoryImport(filePath, importPath) {
  let fullPath = path.join(path.dirname(filePath), importPath);
  return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory();
}

function isLodashModule(importPath) {
  return /lodash\/\w*/.test(importPath);
}

module.exports = function (file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  /*
    replace:
      # extensionless path
      import FN from "./x"; => import FN from "./x.mjs";
      # directory import
      import FN from "../function"; => import FN from "../function/index.mjs";
      # lodash specific
      import lodashMerge from "lodash/merge"; => import lodashMerge from "lodash/merge.js";
  */
  const updatedImports =
    root
      .find(j.ImportDeclaration)
      .filter((x) => x.value.source.type === "Literal")
      // .filter((x) => x.value.source.value.startsWith(".")) // filter out bare imports
      .forEach((x) => {
        let importPath = x.value.source.value;
        let isBareImport = !x.value.source.value.startsWith(".");
        if (isBareImport) {
          if (isLodashModule(importPath)) {
            if (!importPath.endsWith(".js")) {
              // import lodashMerge from "lodash/merge";
              // =>
              // import lodashMerge from "lodash/merge.js";
              console.log(chalk.yellow("lodash submodule:", importPath));
              x.value.source.value += ".js";
            }
          }
        } else {
          if (isDirectoryImport(file.path, importPath)) {
            // import FN from "../function";
            // =>
            // import FN from "../function/index.mjs";
            console.log(chalk.yellow("directory import:", importPath));
            x.value.source.value = importPath + "/index.mjs";
          } else {
            if (!importPath.endsWith(".mjs")) {
              // import { x } from "./x";
              // =>
              // import { x } from "./x.mjs";
              // console.log(chalk.yellow("extensionless import path:", importPath));
              x.value.source.value += ".mjs";
            }
          }
        }
      })
      .size() !== 0;

  /*
    replace:
      _filename => import.meta.url.substr(7)
      _dirname => path.dirname(import.meta.url.substr(7))
  */
  const updatedIdentifiers =
    root
      .find(j.Identifier)
      .filter((x) => x.value.name === "__filename" || x.value.name === "__dirname")
      // .filter((x) => x.value.source.value.startsWith(".")) // filter out bare imports
      .forEach((x) => {
        if (x.value.name === "__filename") {
          console.log(chalk.yellow("replace __filename"));
          // __filename = import.meta.url.substr(7)
          x.value.name = `import.meta.url.substr(7)`;
        } else if (x.value.name === "__dirname") {
          console.log(chalk.yellow("replace __dirname"));
          // __dirname = path.dirname(import.meta.url.substr(7))
          x.value.name = `import.meta.url.substr(7).replace(/[\\/][^\\/]*$/,"")`;
        }
      })
      .size() !== 0;
  const updatedAnything = updatedImports || updatedIdentifiers;
  if (updatedAnything) {
    console.log("transformed:", file.path);
    return root.toSource();
  } else {
    console.log("no imports to transform:", file.path);
    return null;
  }
};

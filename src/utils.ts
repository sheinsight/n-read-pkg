import path from "node:path";
import isBuiltinModule from "is-builtin-module";
import resolveFrom from "resolve-from";
import { type NormalizedReadResult, readPackageUpSync } from "read-pkg-up";

/**
 * found module dir path
 * - if module is builtin, Convert module name to directory name.
 * - if module is not builtin, return module dir path.
 *
 * @param name module id
 * @param cwd dir
 * @returns module entry file path or package.json path
 */
export function findModuleDir(name: string, cwd: string) {
  if (isBuiltinModule(name)) {
    throw new Error(`Built-in module '${name}' cannot has no package.json`);
  }
  let anchorPointFilePath;
  try {
    // if target module is builtin module, Convert module name to directory name.
    // Please note that if you have not used a polyfill, an error of 'cannot find module 'xxx/package.json'' will be thrown.
    anchorPointFilePath = resolveFrom(cwd, name);
  } catch (error) {
    /**
     * because of target module is not configured entry in package.json
     * - not configured 'main' 'module' and 'exports' field
     */
    anchorPointFilePath = resolveFrom(cwd, `${name}/package.json`);
  }
  return path.dirname(anchorPointFilePath);
}

/**
 * fix terser package.json path
 * because of terser has multiple package.json , so read-pkg-up return wrong package.json
   @example
    ```
    .
    ├── CHANGELOG.md
    ├── LICENSE
    ├── PATRONS.md
    ├── README.md
    ├── bin 
    ├── dist
    │   ├── bundle.min.js
    │   └── package.json  // <--- this is wrong package.json
    ├── lib 
    ├── main.js
    ├── node_modules
    ├── package.json    // <--- this is correct package.json
    └── tools 
    ```
 * 
 * @param readResult {@see NormalizedReadResult}
 * @returns  {@see NormalizedReadResult}
 */
export function fixTerser(readResult: NormalizedReadResult) {
  if (readResult.packageJson.private !== true) {
    return readResult;
  }

  const terserReadResult = readPackageUpSync({
    cwd: path.join(path.dirname(readResult.path), ".."),
  });

  return terserReadResult;
}

import { type NormalizedReadResult } from "read-pkg-up";
/**
 * found module dir path
 * - if module is builtin, Convert module name to directory name.
 * - if module is not builtin, return module dir path.
 *
 * @param name module id
 * @param cwd dir
 * @returns module entry file path or package.json path
 */
export declare function findModuleDir(name: string, cwd: string): any;
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
export declare function fixTerser(readResult: NormalizedReadResult): NormalizedReadResult | undefined;

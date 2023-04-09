import { readPackageUpSync } from "read-pkg-up";
import { findModuleDir, fixTerser } from "./utils.js";
/**
 * read package.json
 * for example
 * - builtin module
 * - not configured 'main' 'module' and 'exports' field
 * - terser has multiple package.json
 *
 * @param name module id
 * @param cwd dir
 * @returns {@see NormalizedReadResult}
 */
export function readPackage(name, cwd) {
  const dir = findModuleDir(name, cwd);
  const result = readPackageUpSync({
    cwd: dir
  });
  if (!result) {
    throw new Error(` not found package.json in ${dir} `);
  }
  return fixTerser(result);
}
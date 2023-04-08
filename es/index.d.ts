import type { NormalizedReadResult } from "read-pkg-up";
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
export declare function readPackage(name: string, cwd: string): NormalizedReadResult | undefined;

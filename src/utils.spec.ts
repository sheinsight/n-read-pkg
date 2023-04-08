import { findModuleDir, fixTerser } from "./utils.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NormalizedReadResult } from "read-pkg-up";
import { describe, it, expect } from "vitest";
import resolveFrom from "resolve-from";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demo1Cwd = path.join(__dirname, "..", "fixtures", "demo1");

describe("findModuleDir", () => {
  it("should throw error cannot find module", () => {
    const moduleId = "wxsasas";
    expect(() => {
      findModuleDir(moduleId, process.cwd());
    }).toThrowErrorMatchingInlineSnapshot(`
      "Cannot find module '${moduleId}/package.json'
      Require stack:
      - /Users/ityuany/shined/n-read-pkg/noop.js"
    `);
  });

  it("should throw error become built-in module has no package.json ", () => {
    expect(() => {
      findModuleDir("fs", process.cwd());
    }).toThrowErrorMatchingInlineSnapshot(
      "\"Built-in module 'fs' cannot has no package.json\""
    );
  });

  it("should return the correct path for a non-built-in module without entry in package.json", () => {
    const moduleId = "read-pkg-up";
    const modulePath = findModuleDir("read-pkg-up", demo1Cwd);
    const _dir = path.dirname(resolveFrom(demo1Cwd, moduleId));
    expect(modulePath).toBe(_dir);
  });
});

describe("fixTerser", () => {
  it("should return the original readResult if packageJson.private is not true", () => {
    const inputReadResult = <NormalizedReadResult>{
      path: "some-path/package.json",
      packageJson: {
        name: "some-module",
        version: "1.0.0",
        private: false,
      },
    };

    const fixedResult = fixTerser(inputReadResult);
    expect(fixedResult).toBe(inputReadResult);
  });

  it("should return the correct readResult if packageJson.private is true", () => {
    const moduleId = "terser";
    const wrongPackagePath = `${demo1Cwd}/node_modules/${moduleId}/dist/package.json`;
    const inputReadResult = <NormalizedReadResult>{
      path: wrongPackagePath,
      packageJson: {
        name: moduleId,
        version: "1.0.0",
        private: true,
      },
    };

    const fixedResult = fixTerser(inputReadResult);

    const correctPackagePath = `${demo1Cwd}/node_modules/${moduleId}/package.json`;

    expect(fixedResult!.path).toBe(correctPackagePath);
    expect(fixedResult!.packageJson.private).toBeUndefined();
  });
});

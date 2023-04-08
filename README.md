# 📦 @shined/n-read-pkg

This is a module for reading the specified module's package.json information.

## 🤔 why

When we read packages of modules in our daily life, we always encounter some boundary scenarios.

For example:

- target module is not configured 'package.json' into 'exports' field
- target module is typescript type utils module , so it has no 'main' 'module' and 'exports' field
- target is built-in module
- has multiple package.json in the module see [terser](https://github.com/terser/terser)

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

🚀 We try to solve these problems in this module.

## 🔥 Install

```sh
npm install @shined/n-read-pkg -D
```

## 🦾 Usage

Instructions for use

## 📚 Api

api

## 🫂 Maintainers

- [@ityuany](https://github.com/ityuany)

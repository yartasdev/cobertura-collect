# Collect Cobertura

![NPM Type Definitions](https://img.shields.io/npm/types/%40yartasdev%2Fcobertura-collect)
![NPM Version](https://img.shields.io/npm/v/%40yartasdev%2Fcobertura-collect)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40yartasdev%2Fcobertura-collect)
![NPM License](https://img.shields.io/npm/l/%40yartasdev%2Fcobertura-collect)


Collect cobertura coverages from specific directories and create a summary file

## Story
Inspired by [cobertura-merge](https://github.com/borremosch/cobertura-merge), i aimed to replace the use of node-gyp and collect cobertura coverages from specific folders with [FastGlob](https://github.com/mrmlnc/fast-glob).

## Usage

It can be install globally and run 

```sh
npm install @yartasdev/collect-cobertura -g
```

```sh
@yartasdev/cobertura-collect -p -o cobertura-output.xml -t /coverage/**/cobertura-coverage.xml
```

Or it can be used directly without install

```sh
npx @yartasdev/cobertura-collect -p -o cobertura-output.xml -t /coverage/**/cobertura-coverage.xml
```

## Options

| Option                  | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| -o, --output FILE       | Output file name with extension e.g. /coverage/cobertura.xml |
| -t, --target DIRECTORY  | Target files path /coverage/**/cobertura.xml                 |
| -p, --print             | Prints a summary of the code coverage to the standard output |
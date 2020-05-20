import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

// see: rollup-starter-lib/rollup.config.js

const builtins = ["fs", "path"];
const disabledBuiltins = {
  fs: "null",
  path: "null",
};
const external = builtins.concat(Object.keys(pkg.dependencies));

export default [
  // NOTE: cjs and esm are not needed - only umd
  // cjs = use build/main/index.js
  // esm = use build/module/index.mjs
  /*
  // CommonJS (for Node)
  {
    input: "./build/main/index.js",
    output: [
      {
        file: "dist/spike-api.cjs.js", // pkg.main,
        format: "cjs",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      babel({
        exclude: ["node_modules/**"],
        externalHelpers: false,
        runtimeHelpers: true,
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
    ],
  },

  // ES module (for bundlers)
  {
    input: "./build/module/index.js",
    output: [
      {
        file: "dist/spike-api.esm.mjs", // pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      babel({
        exclude: ["node_modules/**"],
        externalHelpers: false,
        runtimeHelpers: true,
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
    ],
  },
  */

  // browser - umd build for cdn
  {
    input: "./build/module/index.mjs",
    output: [
      {
        name: "SpikeApi",
        file: "./build/umd/spike-api.umd.js", // pkg.browser,
        format: "umd",
        sourcemap: true,
        // NOTE: fs & path aren't used in browser code
        //  - fs/path only used when file path is supplied to wrappers.pdf()
        //  - browser code must supply a base64 encoded string
        globals: disabledBuiltins,
      },
    ],
    external: builtins, // include module deps in umd bundle: ajv, axios, lodash.merge, uuid
    plugins: [
      babel({
        exclude: ["node_modules/**"],
        externalHelpers: false,
        runtimeHelpers: true,
      }),
      resolve({
        browser: true,
      }),
      commonjs(),
      json(),
    ],
  },
];

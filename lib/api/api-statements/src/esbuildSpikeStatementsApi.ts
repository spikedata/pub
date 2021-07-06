import type { Plugin } from "esbuild";

// stubs out node imports used by @spike/api-statements so that
//  `import path from "path";`
// will get bundled as
//  `var path_default = {basename() {}};`
//
// NOTE: this only works because browser code doesn't use the code paths which need these imports - see $/lib/api/api-statements/src/pdf.ts : create()

/*
 * esbuild errors without this plugin:
 *
 > ../../lib/api/api-statements/build/module/pdf.mjs:1:15: error: Could not resolve "fs" (use "platform: 'node'" when building for node)
    1 │ import fs from "fs"; // NOTE: for browser builds need to make fs external
      ╵                ~~~~

 > ../../lib/api/api-statements/build/module/pdf.mjs:2:17: error: Could not resolve "path" (use "platform: 'node'" when building for node)
    2 │ import path from "path"; // NOTE: for browser builds need to make path ext...
      ╵                  ~~~~~~
*/

const _name = "esbuildSpikeStatementsApi";
const _stubs: Record<string, object> = {
  fs: {
    readFileSync() {
      // used by ./pdf.ts
    },
  },
  path: {
    basename(x) {
      // used by ./pdf.ts
      return x;
    },
  },
};

const _resolveFilter = new RegExp(`^(${Object.keys(_stubs).join("|")})$`);

function generateStub(cjs: boolean, stubs: object) {
  return cjs ? generateStubCjs(stubs) : generateStubEsm(stubs);
}

function generateStubEsm(stubs: object) {
  let contents = "export default {";
  for (const s in stubs) {
    contents += `${stubs[s].toString()}\n`;
  }
  contents += "}";
  return contents;
}

function generateStubCjs(stubs: object) {
  let contents = "module.exports = {";
  for (const s in stubs) {
    contents += `${stubs[s].toString()}\n`;
  }
  contents += "}";
  return contents;
}

export default function plugin(cjs: boolean): Plugin {
  return {
    name: _name,
    setup(build) {
      build.onResolve({ filter: _resolveFilter }, (args) => ({
        path: args.path,
        namespace: _name,
      }));

      build.onLoad({ filter: /.*/, namespace: _name }, (args) => {
        if (args.path) {
          return {
            contents: generateStub(cjs, _stubs[args.path]),
            loader: "js",
          };
        } else {
          // return null;
          throw new Error(_name + ": unknown node package");
        }
      });
    },
  };
}

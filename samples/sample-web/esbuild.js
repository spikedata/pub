// stubs out node imports used by @spike/api-statements so that
//  `import path from "path";`
// will transpile as
//  `var path_default = {basename() {}};`
//
// NOTE: this only works because browser code doesn't use the code paths which need these imports - see $/lib/api/api-statements/src/pdf.ts : create()

/*
 > ../../lib/api/api-statements/build/module/pdf.mjs:1:15: error: Could not resolve "fs" (use "platform: 'node'" when building for node)
    1 │ import fs from "fs"; // NOTE: for browser builds need to make fs external
      ╵                ~~~~

 > ../../lib/api/api-statements/build/module/pdf.mjs:2:17: error: Could not resolve "path" (use "platform: 'node'" when building for node)
    2 │ import path from "path"; // NOTE: for browser builds need to make path ext...
      ╵                  ~~~~~~
*/

// TODO:
// process.argv[2]: prod | dev | watch
const buildType = process.argv[2];

const stubNodePkgs = {
  name: "stubNodePkgs",
  setup(build) {
    // Intercept import paths called "env" so esbuild doesn't attempt
    // to map them to a file system location. Tag them with the "env-ns"
    // namespace to reserve them for this plugin.
    build.onResolve({ filter: /^(fs|path)$/ }, (args) => ({
      path: args.path,
      namespace: "stub",
    }));

    // Load paths tagged with the "stub" namespace and stub them out.
    build.onLoad({ filter: /.*/, namespace: "stub" }, (args) => {
      let contents;
      switch (args.path) {
        case "fs":
          contents = "export default { readFileSync() {} }"; // stub out fs
          break;
        case "path":
          contents = "export default { basename() {} }"; // stub out path
          break;
        default:
          throw new Error("unknown node package to stub");
      }

      return {
        contents,
        loader: "js",
      };
    });
  },
};

const outfile = "./src/server/public/dist/app.js";

require("esbuild")
  .build({
    entryPoints: ["./src/ux/app.ts"],
    platform: "browser",
    bundle: true,
    watch: buildType === "watch",
    minify: buildType === "prod",
    sourcemap: "external",
    outfile,
    plugins: [stubNodePkgs],
  })
  .then((result) => {
    if (result.warnings.length) {
      console.warn(result.warnings.join("\n"));
    }
    if (result.errors.length) {
      console.error(result.errors.join("\n"));
    }
    if (!result.warnings.length && !result.errors.length) {
      console.log("wrote:", outfile);
    }
  })
  .catch(() => process.exit(1));

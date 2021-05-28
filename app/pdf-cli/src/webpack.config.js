const path = require("path");

module.exports = {
  target: "node",
  devtool: "source-map",
  mode: "development",
  resolve: {
    extensions: [".js"],
  },
  entry: {
    run: [path.join(__dirname, "/run")],
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js",
  },
  resolve: {
    fallback: {
      assert: require.resolve("assert"),
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
  // module: {
  //   rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: "babel-loader",
  //       // must use options here, .babelrc is not being read by babel-loader
  //       options: {
  //         presets: [
  //           [
  //             "@babel/env",
  //             {
  //               targets: {
  //                 node: "8",
  //               },
  //             },
  //           ],
  //         ],
  //         plugins: [
  //           // "@babel/plugin-proposal-export-default-from",
  //           // "@babel/plugin-proposal-export-namespace-from",
  //         ],
  //       },
  //     },
  //   ],
  // },
};

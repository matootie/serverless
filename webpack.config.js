const slsw = require("serverless-webpack")
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: "none",
  plugins: [new ForkTsCheckerWebpackPlugin()],
  optimization: {
    nodeEnv: false,
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    plugins: [new TSConfigPathsPlugin({ configFile: "./tsconfig.json" })],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
      },
    ],
  },
}

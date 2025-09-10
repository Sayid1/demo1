const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const plugins = [];

module.exports = {
  transpileDependencies: ["uview-ui"],
  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src"));
    config.resolve.alias.set("uview-ui", resolve("src/libs/uview-ui"));
    config.plugin("define").tap((args) => {
      args[0]["process.env"].PAGE_OUTPUT_MODE =
        '"' + process.env.PAGE_OUTPUT_MODE + '"';
      return args;
    });
  },
  configureWebpack: {
    plugins,
  },
};

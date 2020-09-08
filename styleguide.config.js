const path = require("path");

module.exports = {
  title: "Figure: React Components",
  components: "src/components/*/index.js",
  moduleAliases: {
    "@figure/react-components": path.resolve(__dirname, "src"),
  },
  webpackConfig: require("./webpack.config"),
};

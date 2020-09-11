const { resolve } = require("path");

module.exports = {
  styleguideDir: "dist-docs",
  title: "Offset Partners: React Components",
  components: "src/components/*/[A-Z]*.js",
  moduleAliases: {
    "@offsetpartners/react-components": resolve(__dirname, "src/components"),
  },
  webpackConfig: require("./webpack.dev"),
};

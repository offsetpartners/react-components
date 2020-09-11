const webpack = require("webpack");
const { resolve } = require("path");
const pkg = require("./package.json");

module.exports = function () {
  return {
    entry: {
      figure: resolve(__dirname, "src/components/index.js"),
    },

    output: {
      publicPath: "/dist/",
      path: resolve(__dirname, "dist"),

      filename: "[name].js",

      library: pkg.name,
      libraryTarget: "umd",
      umdNamedDefine: true,
    },

    // Modules
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                fallback: "file-loader",
                name: "[name][md5:hash].[ext]",
                outputPath: "assets/",
                publicPath: "/assets/",
              },
            },
          ],
        },
        {
          test: /\.(css|less)$/, // .less and .css
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: { javascriptEnabled: true },
              },
            },
          ],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
          include: resolve(__dirname, "src/components"),
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(pdf|doc|zip)$/,
          use: ["file-loader"],
        },
      ],
    },

    resolve: {
      alias: {
        Components: resolve(__dirname, "src/components/"),
      },
    },

    externals: {
      // Don't bundle react or react-dom
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM",
      },
    },

    // Add an instance of the MiniCssExtractPlugin to the plugins list
    // But remember - only for production!
    plugins: [
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    ],
  };
};

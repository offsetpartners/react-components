const webpack = require("webpack");
const { resolve } = require("path");
const pkg = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = function () {
  return {
    entry: {
      figure: resolve(__dirname, "src/index.js"),
    },

    output: {
      publicPath: "/dist/",
      path: resolve(__dirname, "dist"),

      filename: "[name].js",

      library: pkg.name,
      libraryTarget: "umd",
      umdNamedDefine: true,
    },

    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
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
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: { javascriptEnabled: true },
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
          ],
        },

        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
          include: resolve(__dirname, "src"),
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
        "@offsetpartners/react-components": resolve(__dirname, "src"),
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

    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
      new BundleAnalyzerPlugin({
        generateStatsFile: true,
        analyzerMode: "disabled",
        statsOptions: { source: false },
      }),
    ],
  };
};

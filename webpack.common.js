const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PUBLIC_PATH = 'https://commuter-6f37d.firebaseapp.com/';

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{loader: "html-loader", options: { minimize: true}}]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'commuter',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'sw.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
  ]
};
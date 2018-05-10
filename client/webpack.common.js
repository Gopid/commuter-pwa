const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PUBLIC_PATH = (process.env.NODE_ENV === 'production') ? 'https://commuter-6f37d.firebaseapp.com/' : 'http://localhost:8080/';

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
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
        importScripts: [PUBLIC_PATH + 'fcm-push-notification.js'],
        staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/, /\.(jpe?g|png|gif|svg|js|css)$/],
      }
    ),
    new CopyWebpackPlugin([
      {from: './src/img', to: 'img'},
      {from: './src',to:'', ignore: ['*.js', '*.css']},
      {from: './src/fcm-push-notification.js'}
    ])
  ]
};
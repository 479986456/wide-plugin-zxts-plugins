const path = require('path')
const config = require('./wide.config.json')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WideReplacePublicPath = require('./cli/webpack/plugins/replace-public-path')

const publicPath = `WIDE_PLUGIN_DEV_${config.pluginId}`

module.exports = merge(commonConfig, {
  target: 'web',
  mode: 'production',
  entry: './cli/pro.entry.js',
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }, {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './'
          }
        },
        'css-loader',
        'less-loader'
      ]
    }]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: publicPath,
    libraryTarget: 'var'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      ignoreOrder: false,
    }),
    new WideReplacePublicPath({
      originPublicPath: publicPath,   // 与publicPath 一致
      newPublicPath: `window.WIDE_PLUGIN_PUBLIC_PATH_${config.pluginId}`,
      mode: 'production'
    })
  ],
  // 不能开启优化
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         name: 'chunk-vendors',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         chunks: 'initial'
  //       },
  //       common: {
  //         name: 'chunk-common',
  //         minChunks: 2,
  //         priority: -20,
  //         chunks: 'initial',
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  devtool: 'cheap-module-source-map'
})

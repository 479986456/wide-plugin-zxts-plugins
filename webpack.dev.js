const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const config = require('./cli/config')
const autoRelease = require('./cli/publish/auto.release')

const envPath = path.join(__dirname, 'env.runtime.json')
const pkgPath = path.join(__dirname, 'package.json')


delete require.cache[envPath]
const env = require(envPath)
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
}

function beforeHooks (app, server, complier) {
  app.get('/api/system/ping', (req, res) => {
    res.set(headers)
    res.send('pong')
  })
  app.get('/api/system/exit', (req, res) => {
    res.set(headers)
    res.json({
      status: 'roger'
    })
    process.exit(0)
  })
  app.get('/api/plugin/version', (req, res) => {
    delete require.cache[pkgPath]
    const pkgContent = require(pkgPath)
    res.set(headers)
    res.json({
      version: pkgContent.version,
      name: pkgContent.name,
      cName: pkgContent.cName
    })
  })
  app.get('/api/plugin/release', (req, res) => {
    res.set(headers)
    const query = req.query
    delete require.cache[envPath]
    const envContent = require(envPath)
    const { releaseStatus, releaseVersion } = envContent
    if (!query.name || !query.version) {
      res.json({
        releaseStatus: 'error',
        releaseVersion: null,
        releaseMessage: '参数不合法'
      })
    } else {
      if (['pending', 'success', 'error'].indexOf(releaseStatus) !== -1 && (query.version === releaseVersion)) {
        res.json({
          releaseStatus: envContent.releaseStatus,
          releaseVersion: envContent.releaseVersion,
          releaseMessage: envContent.releaseMessage,
          releaseId: envContent.releaseId,
          needsUpdateVersion: envContent.needsUpdateVersion
        })
      } else {
        autoRelease(query) // 执行发布
        res.json({
          releaseStatus: 'pending',
          releaseVersion: '正在发布',
          releaseMessage: query.version
        })
      }
    }
  })
}

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: {
    view: './views/index.js',
    index: './cli/dev.entry.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        './cli/webpack/loaders/style-loader',
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        './cli/webpack/loaders/style-loader',
        'css-loader',
        'less-loader'
      ]
    }]
  },
  output: {
    filename: '[name].js',
    path: '/',
    publicPath: `${config.origin}:${env.port}/`
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  cache: false,
  devServer: {
    before: beforeHooks,
    openPage: './views/index.html',
    index: './views/index.html',
    open: true,
    disableHostCheck: true,
    hot: true,
    https: true,
    headers: headers,
    stats: 'minimal'
  }
})
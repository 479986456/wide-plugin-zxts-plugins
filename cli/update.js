const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const tmpDir = require('os').tmpdir()
const tar = require('tar')
const pkg = require('../package.json')

const pluginTmpDir = fs.mkdtempSync(path.join(tmpDir, 'wide-plugin-'))
const pluginTmpPath = path.join(pluginTmpDir, 'plugin-cli.tar')
const unzipTmpDir = path.join(pluginTmpDir)

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
utils.logger.info('正在更新插件脚手架')

utils.downloadLatestPluginCli(pluginTmpPath)
  .then(res => {
    tar.x({
      file: pluginTmpPath,
      C: unzipTmpDir
    }).then(async res => {
      fs.unlinkSync(pluginTmpPath)
      const pkgPath = require(path.join(unzipTmpDir, 'package.json'))
      if (!pkgPath['cli-version'] || pkgPath['cli-version'] !== pkg['cli-version']) {
        utils.logger.warn(`正在同步脚本文件`)
        await utils.updatePluginCli(unzipTmpDir)
        utils.logger.success(`更新完成`)
      } else {
        utils.logger.warn(`插件脚手架无更新`)
      }
    })
  })
  .catch(err => {
    utils.logger.error(`下载最新脚手架时出错`)
  })
const path = require('path')
const fs = require('fs')
const tmpDir = require('os').tmpdir()
const copydir = require('copy-dir')
const semver = require('semver')
const utils = require('../utils')
const upload = require('./upload')
const wideConfig = require('../../wide.config.json')

const pluginSourceDir = path.join(__dirname,  '../../')
const pluginDir = fs.mkdtempSync(path.join(tmpDir, 'wide-plugin-'))
const updateVersion = require('./upgrade')

module.exports = async function (note, mamual = true) {
  utils.logger.info(`正在生成插件包...`)
  delete require.cache[require.resolve('../../package.json')]
  const pkg = require('../../package.json')
  const tarName = `${pkg.name}.tar`
  copydir.sync(pluginSourceDir, pluginDir, {
    filter: function (stat, filepath, filename) {
      if (stat === 'directory') {
        return !/node_modules/.test(filepath)
          && !/cli/.test(filepath)
          && !/src/.test(filepath)
          && !/views/.test(filepath)
          && !/\.git/.test(filepath)
      }
      if (stat === 'file') {
        return /package\.json/.test(filename) || /dist/.test(filepath)
      }
      return true
    }
  })
  
  const version = pkg.version
  if (!semver.valid(version)) {
    utils.logger.error('发布失败，版本号不符合语义化(semver)版本规则！')
    return Promise.reject('版本号不合法')
  } else {
    var error = null
    var releaseRes = null
    try {
      const res = await utils.archiver(pluginDir, pluginSourceDir, tarName)
      utils.rmDir(pluginDir)
      const { realPath } = res
      
      let globalLibrary
      try {
        globalLibrary = fs.readFileSync(path.resolve(__dirname, '../useGlobalLibrary.json'))
        globalLibrary = JSON.parse(globalLibrary) || {}
        globalLibrary = Object.keys(globalLibrary).map(d => d.toLowerCase())
        globalLibrary = [...new Set(globalLibrary)]
        globalLibrary = JSON.stringify(globalLibrary)
      } catch (err) {
        utils.logger.error(`获取插件全局依赖失败：${err.message}`)
      }

      releaseRes = await upload(realPath, { version, note, ...wideConfig, globalLibrary })
      fs.unlinkSync(realPath)
      utils.logger.success(`v${releaseRes.version} 已经成功发布！`)
      utils.logger.tip(`该插件使用的wide全局依赖有：${globalLibrary}`)
      utils.logger.tip('wide全局依赖检测如有错误请在WIDE群里反馈！！该结果将影响wide项目导出！！')
    } catch (err) {
      utils.logger.error(`发布失败(${err.status})：${err.message}`)
      const { data } = err
      if (data) {
        // 只针对版本过低
        const { latestVersion, isEqual } = data
        if (mamual) { // 手动发布
          if (isEqual) {
            utils.logger.info(`请升级版本后再执行发布操作！`)
          } else {
            await updateVersion(latestVersion, true)
            utils.logger.info(`版本已自动同步，请重新执行发布操作！`)
          }
        } else {  // 自动发布
          await updateVersion(latestVersion, true)
        }
        await utils.refreshEnv({
          releaseStatus: 'error',
          releaseMessage: err.message,
          needsUpdateVersion: true
        })
      } else {
        await utils.refreshEnv({
          releaseStatus: 'error',
          releaseMessage: err.message
        })
      }
      if (fs.existsSync(pluginDir)) {
        utils.rmDir(pluginDir)
      }
      fs.unlinkSync(path.join(pluginSourceDir, tarName))
      error = err.message
    }
    if (error) {
      return Promise.reject(error)
    } else {
      return Promise.resolve(releaseRes)
    }
  }
}
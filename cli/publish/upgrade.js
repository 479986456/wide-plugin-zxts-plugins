const fs = require('fs')
const path = require('path')
const semver = require('semver')
const pkgPath = path.join(__dirname, '..', '..', 'package.json')
/**
 * 升级版本
 * @param { String } upgrade 版本号 | 版本升级规则
 * @param { Boolean } fixed 是否固定版本
 */
module.exports = async function updateVersion (upgrade) {

  delete require.cache[pkgPath]
  const pkgContent = require(pkgPath)
  if (!semver.valid(upgrade)) {
    utils.logger.error('发布失败，版本号不符合语义化(semver)版本规则！')
    return Promise.reject('版本号不合法')
  }
  pkgContent.version = upgrade
  fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, 2, 2))
}
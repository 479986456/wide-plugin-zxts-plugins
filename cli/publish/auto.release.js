
const packer = require('./packer')
const utils = require('../utils')
const updateVersion = require('./upgrade')
const execSync = require('child_process').exec

function builderProcess () {
  return new Promise((resolve, reject) => {
    const builder = execSync('yarn build')
    builder.on('close', (code) => {
      resolve(code)
    })
  })
}

module.exports = async function autoRelease ({ name, version, summary } = payload) {

  // step.1 升级版本
  utils.logger.info(`开始执行自动发布：[${name}] - [${version}] - [${summary}]`)
  await utils.refreshEnv({
    releaseStatus: 'pending',
    releaseVersion: version,
    releaseMessage: '正在升级版本',
    needsUpdateVersion: false
  })
  await updateVersion(version)

  // step.2 执行构建
  utils.logger.info(`正在构建`)
  await utils.refreshEnv({
    releaseMessage: '正在构建'
  })
  const res = await builderProcess()
  if (res !== 0) {
    await utils.refreshEnv({
      releaseStatus: 'error',
      releaseMessage: '构建失败'
    })
    utils.logger.info(`构建失败`)
  } else {
    utils.logger.info(`正在上传`)

    // step.3 上传
    await utils.refreshEnv({
      releaseMessage: '正在上传'
    })
    packer(summary, false).then(async ({ _id }) => {
      await utils.refreshEnv({
        releaseStatus: 'success',
        releaseMessage: '发布成功',
        releaseId: _id
      })
    }).catch(err => {})
  }
}
const execSync = require('child_process').exec
const findPort = require('./port.finder')
const utils = require('../utils')
const path = require('path')
const fs = require('fs')
const clic = require('cli-color')
const pkg = require('../../package.json')
const tmpDir = require('os').tmpdir()
const tar = require('tar')
const inquirer = require('inquirer')
const cmd = inquirer.createPromptModule()
const ncp = require('copy-paste')

const pluginTmpDir = fs.mkdtempSync(path.join(tmpDir, 'wide-plugin-'))
const pluginTmpPath = path.join(pluginTmpDir, 'plugin-cli.tar')
const unzipTmpDir = path.join(pluginTmpDir)

utils.logger.info(`正在检查更新 [v${pkg["cli-version"]}]`)

utils.downloadLatestPluginCli(pluginTmpPath)
  .then(res => {
    tar.x({
      file: pluginTmpPath,
      C: unzipTmpDir
    }).then(async res => {
      fs.unlinkSync(pluginTmpPath)
      const pkgPath = require(path.join(unzipTmpDir, 'package.json'))
      if (!pkgPath['cli-version'] || pkgPath['cli-version'] !== pkg['cli-version']) {
        utils.logger.info(`插件脚手架有更新`)
        cmd({
          type: 'confirm',
          name: 'u',
          message: '是否更新',
        }).then(async ({u}) => {
          if (u) {
            utils.logger.info(`正在更新`)
            await update(unzipTmpDir)
            utils.logger.success(`更新完成，请重新启动调试`)
          } else {
            bootstrap()
          }
        })
      } else {
        utils.logger.info(`插件脚手架无更新`)
        bootstrap()
      }
    }).catch(err => {
      utils.logger.error('检查更新失败')
      bootstrap()
    })
  })
  .catch(err => {
    throw err
  })


async function update (source) {
  await utils.updatePluginCli(source)
}

async function bootstrap () {
  findPort().then(async (port) => {
    utils.logger.info(`调试端口号：${port}`)
    utils.logger.info(`调试链接：https://localhost:${port}/views/index.html`)
    ncp.copy(`https://localhost:${port}/views/index.html`)
    const envPath = path.join(__dirname, '../../', 'env.runtime.json')
    if (fs.existsSync(envPath)) {
      await utils.refreshEnv({ port })
    } else {
      fs.writeFileSync(envPath, JSON.stringify({
        port: port
      }, null, 2))
    }
    const sp = execSync(`webpack-dev-server --config webpack.dev.js --port ${port}`)
    sp.stdout.on('data', console.log)
    sp.stderr.on('error', (data) => {
      console.log(clic.redBright(data))
    })
    sp.stderr.on('data', (data) => {
      console.log(clic.redBright(data))
    })
    sp.on('close', console.log)
  })
}
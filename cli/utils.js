const clic = require('cli-color')
const archiver = require('archiver')
const path = require('path')
const fs = require('fs')
const config = require('../wide.config.json')
const envPath = path.join(__dirname, '..', 'env.runtime.json')
const https = require('https')
const copydir = require('copy-dir')

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const logger = {
  info: (...msg) => {
    console.log(clic.cyanBright(`[WIDE-INFO]`, msg))
  },
  success: (...msg) => {
    console.log(clic.greenBright(`[WIDE-SUCCESS]`, msg))
  },
  error: (...msg) => {
    console.log(clic.redBright(`[WIDE-ERROR]`, msg))
  },
  warn: (...msg) => {
    console.log(clic.yellowBright(`[WIDE-WARN]`, msg))
  },
  tip: (...msg) => {
    console.log(clic.magentaBright.bold(`[WIDE-TIP]`, msg))
  }
}

async function createTmpWriteStream (dir, name) {
  const realPath = path.join(dir, name)
  const writeStream = fs.createWriteStream(realPath)
  return { realPath, writeStream }
}

function rmDir (dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if(filename == "." || filename == "..") {
        } else if(stat.isDirectory()) {
            rmDir(filename);
        } else {
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir)
}

module.exports = {
  logger,
  rmDir,
  updatePluginCli: async function (sourceDir) {
    return new Promise((resolve, reject) => {
      // TODO: 同步脚本文件
      const targetDir = path.join(__dirname, '..')
      const srcDir = path.join(sourceDir, 'src')
      if (fs.existsSync(srcDir)) {
        utils.rmDir(srcDir)
      }
      const remotePkgPath = path.join(sourceDir, 'package.json')
      const currentPkgPath = path.join(targetDir, 'package.json')
      if (fs.existsSync(remotePkgPath) && fs.existsSync(currentPkgPath)) {
        const remotePkgContent = require(remotePkgPath)
        const currentPkgContent = require(currentPkgPath)
        // 只更新的字段："cli-version"，"scripts"，"devDependencies"
        currentPkgContent.scripts = remotePkgContent.scripts
        currentPkgContent['cli-version'] = remotePkgContent['cli-version']
        currentPkgContent.devDependencies = remotePkgContent.devDependencies
        fs.writeFileSync(currentPkgPath, JSON.stringify(currentPkgContent, 2, 2))
        fs.unlinkSync(remotePkgPath)
      }
      copydir(sourceDir, targetDir, {}, (err) => {
        if (err) {
          reject(err)
        }
        rmDir(sourceDir)
      })
      resolve()
    })
  },
  downloadLatestPluginCli: async function (dest) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
    return new Promise((resolve, reject)=>{
      const file = fs.createWriteStream(dest)
      https.get(config.updateUrl, (res)=>{
        if(res.statusCode !== 200){
          reject(response.statusCode)
          return
        }
        res.on('end', ()=>{
          // 
        });
        file.on('finish', () => {
          file.close(resolve)
        }).on('error', (err) => {
          fs.unlink(dest)
          reject(err.message)
        })
        res.pipe(file)
      })
    })
  },
  refreshEnv: async function (options) {
    delete require.cache[envPath]
    if (fs.existsSync(envPath)) {
      const envContent = require(envPath)
      Object.assign(envContent, options)
      fs.writeFileSync(envPath, JSON.stringify(envContent, null, 2))
    } else {
      fs.writeFileSync(envPath, JSON.stringify(options, null, 2))
    }
  },
  archiver: async function (sourceDir, tarDir, tarName) {
    return new Promise(async (resolve, reject) => {
      const format = 'tar'
      const options = {
        zlib: {
          level: 9
        }
      }
      const archive = archiver(format, options)
      const { realPath, writeStream } = await createTmpWriteStream(tarDir, tarName)
  
      writeStream.on('close', function () {
        resolve({ realPath, sourceDir })
      })
  
      writeStream.on('end', function () {
        logger.success('插件包生成完毕')
      })
  
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          logger.warn(err)
        } else {
          logger.warn(err)
        }
        reject(err)
      })
  
      archive.on('error', function (err) {
        reject(err)
      })
      archive.pipe(writeStream)
      archive.directory(sourceDir, '/')
      archive.finalize()
    })
  }
}
/**
 * 上传插件
 */
const fs = require('fs')
const RP = require('request-promise')
const config = require('../config')

module.exports = async function (zipPath, options = {}) {
  const { pluginId } = options
  const uri = `${config.publishUrl}${pluginId}`
  return new Promise((resolve, reject) => {
    const formOptions = {
      method: 'POST',
      uri,
      rejectUnauthorized: false,
      formData: {
        ...options,
        package: {
          value: fs.createReadStream(zipPath),
          options: {
            fileName: 'plugin.zip',
            contentType: 'application/zip'
          }
        }
      }
    }
    RP(formOptions).then(res => {
      resolve(JSON.parse(res).data)
    }).catch(err => {
      reject(JSON.parse(err.error))
    })
  })
}
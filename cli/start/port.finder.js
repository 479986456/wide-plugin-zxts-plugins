const portfinder = require('portfinder')
const config = require('../config')
const utils = require('../utils')

function freePort () {
  return new Promise((resolve, reject) => {
    portfinder.getPort({
      port: config.port,
      stopPort: config.endPort,
    }, (err, port) => {
      if (err) {
        reject(err)
      } else {
        resolve(port)
      }
    })
  })
}

module.exports = async function () {
  return await freePort()
    .then(port => port)
    .catch(err => {
      utils.logger.error(`在 [${config.port}] 到 [${config.endPort}] 之间已无可用端口号`)
      process.exit(1)
    })
}
const PORT = 3000
const END_PORT = 4000
const SCRIPT_NAME = 'plugin.js'
const HOST = `localhost`
const PROTOCOL = 'https'
const uConfig = require('../wide.config.json')
const path = require('path')

module.exports = {
  port: PORT,
  endPort: END_PORT,
  protocol: PROTOCOL,
  origin: `${PROTOCOL}://${HOST}`,
  scriptName: SCRIPT_NAME,
  scriptUrl: `${PROTOCOL}://${HOST}:${PORT}/${SCRIPT_NAME}`,
  rootDir: path.join(__dirname, '..'),
  ...uConfig,
}
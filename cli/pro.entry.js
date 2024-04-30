/**
 * production模式下的入口文件
 */
import { pluginId } from '../wide.config.json'
const plugin = require('../src/index')
window.WIDE.use(plugin.default, {pluginId})
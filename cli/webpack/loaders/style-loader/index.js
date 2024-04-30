
/**
 * WIDE 样式热加载 loader
 * 仅在 development 开发模式下使用
 * 衍生自 vue-style-loader
 */

var loaderUtils = require('loader-utils')
var path = require('path')
var hash = require('hash-sum')
var qs = require('querystring')

module.exports = function () {}

module.exports.pitch = function (remainingRequest) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('wide-plugin-style-loader 仅在开发模式下可用')
  }
  const isProduction = false
  const addStylesInEditorPath = loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, 'lib/addStylesClient.js'))
  const request = loaderUtils.stringifyRequest(this, '!!' + remainingRequest)
  const relPath = path.relative(__dirname, this.resourcePath).replace(/\\/g, '/')
  const id = JSON.stringify(hash(request + relPath))
  const options = loaderUtils.getOptions(this) || {}

  const isVue = (
    /"vue":true/.test(remainingRequest) || qs.parse(this.resourceQuery.slice(1)).vue != null
  )
  
  const shared = [
    '// style-loader: Adds some css to the DOM by adding a <style> tag',
    '',
    '// load the styles',
    'var content = require(' + request + ');',
    // content list format is [id, css, media, sourceMap]
    "if(typeof content === 'string') content = [[module.id, content, '']];",
    'if(content.locals) module.exports = content.locals;'
  ]

  const code = [
    '// add the styles to the DOM',
    'var add = require(' + addStylesInEditorPath + ').default',
    'var update = add(' + id + ', content, ' + isProduction + ', ' + JSON.stringify(options) + ');'
  ]

  const hotCode = code.concat([
    'if(module.hot) {',
    ' // When the styles change, update the <style> tags',
    ' if(!content.locals) {',
    '   module.hot.accept(' + request + ', function() {',
    '     var newContent = require(' + request + ');',
    "     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];",
    '     update(newContent);',
    '   });',
    ' }',
    ' // When the module is disposed, remove the <style> tags',
    ' module.hot.dispose(function() { update(); });',
    '}'
  ])
  return shared.concat(hotCode).join('\n')
}

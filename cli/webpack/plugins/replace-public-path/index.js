const fs = require("fs")
const path = require("path")
const compilerSfc = require("@vue/compiler-sfc")
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const VUE_COMP = ['vui', 'lcharts']
const GLOBAL_COMP = ['FGL', 'FMap3D', 'smartEF', 'd3', 'LCharts', 'VUI', 'echarts', 'THREE']
const childrenKey = {
  smartEF: ['echarts'],
  L3Ds: ['FGL'],
  LCharts: ['smartEF']
}
const data = {}

module.exports = class WideReplacePublicPath {
  constructor (options) {
    this.__options = options
    this.emit = this.emit.bind(this)
  }
  apply (compiler) {
    compiler.hooks.normalModuleFactory.tap('wide-normalModuleFactory', (factory) => {
      factory.hooks.parser
        .for('javascript/auto')
        .tap('wide-variables', (parser, options) => {
          // 自由变量
          ['', 'window.'].forEach(prefix => {
            GLOBAL_COMP.forEach(compName => {
              const ck = childrenKey[compName] || []
              ck.push('')
              ck.forEach(k => {
                const exp = `${prefix}${compName}${k && `.${k}`}`
                parser.hooks.evaluateIdentifier.for(exp).tap('freeVar', (expression) => {
                  data[compName] = true
                });
              })
            })
          })
          
          // 定义的变量
          GLOBAL_COMP.forEach(compName => {
            parser.hooks.evaluateDefinedIdentifier.for(`this.WIDE_LIB.${compName}`).tap('defineVar', (expression) => {
              data[compName] = true
            });
          })
        });
    });
    
    compiler.hooks.compilation.tap('wide-compilation', compilation => {
      compilation.hooks.buildModule.tap('wide-vue-comp-plugin', (module) => {
        if (module.resource && module.resource.endsWith('.vue')) {
          const vueFileContent = fs.readFileSync(module.resource, { encoding: 'utf8' })
          const { descriptor } = compilerSfc.parse(vueFileContent)
          if (descriptor?.template?.ast) {
            const loop = [descriptor?.template?.ast]
            while (loop.length) {
              const current = loop.shift()

              if (current.tag) {
                const [tagFirst] = current.tag.split('-')
                if(VUE_COMP.includes(tagFirst)){
                  data[tagFirst] = true
                }
              }

              if (current.children && current.children.length) {
                loop.push(...current.children)
              }
            }
          }

          if(descriptor?.script?.content){
            const ast = parser.parse(descriptor.script.content, { jsx: true, sourceType: 'module' })
            traverse(ast, {
              ExportDefaultDeclaration(path) {
                const property = path?.node?.declaration?.properties || []
                property.forEach(d => {
                  if(d.key?.name === 'smartef'){
                    data['smartef'] = true
                  }
                })
              }
            })
          }
        }
      });
    });

    compiler.hooks.emit.tap({
      name: 'WideReplacePublicPath'
    }, this.emit)
  }

  emit (compilation) {
    // 将插件依赖存储到文件
    fs.writeFileSync(path.resolve(__dirname, '../../../useGlobalLibrary.json'), JSON.stringify(data))

    const options = this.__options
    const { mode } = options
    if (mode === 'production') {
      compilation.chunks.forEach(chunk => {
        chunk.files.forEach(fileName => {
          if (fileName.endsWith('.css')) {
            const sourceContent = compilation.assets[fileName].source()
            compilation.assets[fileName].source = function () {
              const reg = new RegExp(`${options.originPublicPath}`, 'g')
              return sourceContent.replace( reg, './')
            }
          }
          if (fileName.endsWith('.js')) {
            const sourceContent = compilation.assets[fileName].source()
            compilation.assets[fileName].source = function () {
              return sourceContent.replace(
                `"${options.originPublicPath}"`,
                options.newPublicPath
              )
            }
          }
        })
      })
    } else {
      // TODO: development 模式下 publicPath 替换
    }
    
  }
}
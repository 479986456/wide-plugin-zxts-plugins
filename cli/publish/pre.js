const inquirer = require('inquirer')
const cmd = inquirer.createPromptModule()
cmd({
  type: 'input',
  name: 'note',
  message: '请输入版本摘要',
}).then(async v => {
  console.log(`版本摘要：${v.note}`)
  return require('./packer')(v.note)
}).then(() => {
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
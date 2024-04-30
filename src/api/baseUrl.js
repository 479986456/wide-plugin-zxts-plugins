import axios from 'axios';
function getAuthToken() {
  return localStorage.getItem('zeus-token')
}
let options = {}
if (window.PROJECT_RUNNING_IN_WIDE) {
  let authorization = "MjcwNTYyNjc3MTU5OTk1MzYyNDoxMDA4MDE6NDM1M2ViODUtNmEyZi00YmEwLWI4NjEtYjYwYzQwNjEyZjM1"
  let ipUrl = "10.58.214.161"
  if (localStorage.getItem('zeus-token')) {
    authorization = localStorage.getItem('zeus-token')
  }
  options = {
    baseURL: `https://wide.qianxin-inc.cn/wide-api/system/proxy`,
    headers: {
      'x-wide-proxy-options': JSON.stringify({
        "target": `https://${ipUrl}/dayu/v1/task`,
        "headers": { "authorization": authorization }, "changeOrigin": false, "secure": false
      })
    },
    timeout: 60000,
  }
} else {
  options = {
    baseURL: `/dayu/v1/task`,
    headers: {
      authorization: getAuthToken()
    },
    timeout: 60000,
  }
}

const ajax = axios.create(options);

export { ajax };
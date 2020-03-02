import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/style.less'
import axios from 'axios'
import jsonBig from 'json-bigint'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios 解析完的对象中的数字已经有问题了。
// 对于这种问题，axios 给你提供了一个 API，可以手动解析原始数据。
// 我们就可以在 axios 提供的那个 API 中使用 json-biginit 去解析含有超出安全整数范围的 json 内容数据。
// 它会将 json 转为 JavaScript 对象，它自动判断内容中数字如果超出安全整数范围，自动处理成其他格式
// JSONbig.parse(json);
axios.defaults.transformResponse = [function (data, headers) {
  // 这里使用 JSONbig.parse 转换原始数据
  // 类似于 JSON.parse
  // 但是它会处理其中超出安全整数范围的整数问题。
  // 严谨一点，如果 data 不是 json 格式字符串就会报错
  try {
    return jsonBig.parse(data)
  } catch (err) {
    console.log('获取jsonBig数据失败', err)
    return {}
  }
}]
Vue.prototype.$axios = axios // 将 axios 共享给所有实例使用

// 请求拦截器
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/style.less'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将 axios 共享给所有实例使用

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

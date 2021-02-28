import Vue from 'vue'
import App from './App.vue'
import router from './router/'
//导入element-ui框架
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入全局样式表
import './assets/css/global.css'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

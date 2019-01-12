import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import '../static/reset.css'
import echarts from 'echarts' //引入echarts
// 将echarts挂在到vue原型上
Vue.prototype.$echarts = echarts //引入组件


//使用elementUI
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

// 引入axios
import Axios from 'axios'
Vue.prototype.$axios = Axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

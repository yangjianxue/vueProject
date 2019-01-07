// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'



import router from './router'
import ElementUI from 'element-ui'

import store from './vuex/store.js'

// import './config/rem'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/reset.css'


import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件



Vue.use(ElementUI)


import Axios from 'axios'
Vue.prototype.$axios = Axios

Vue.config.productionTip = false



import VueLazyload from 'vue-lazyload' //引入这个懒加载插件
 


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

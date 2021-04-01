// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ('./assets/css/reset.css')//引入外部的css文件
import './assets/js/reset'
import gFilter from  './filter'
import VantUI from 'vant'
import 'vant/lib/index.css'
import store from './store'
Vue.use(VantUI)

Vue.prototype.$imgUrl = 'http://localhost:3010'
for(let item in gFilter){
  Vue.filter(item,gFilter[item])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

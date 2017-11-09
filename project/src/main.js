// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'					// 导入vue模块
import App from './App'				// 导入 App.vue   	.vue 和.js 后缀名可以省略
import router from './router' // 导入 ./router/index.js		
import  "./server/mock.js";	  //  导入非export 模块
import vueResource from 'vue-resource' // 导入ajax 请求模块
Vue.config.productionTip = false

															//7. vuex 导入 store
import store from "@/store/index.js"

Vue.use(vueResource);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  														// 8.vuex 在根app里面使用vuex
  store,
  router,  
  template: '<App/>',
  components: { App }
})

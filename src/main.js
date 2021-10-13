import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './routers/index.js'

Vue.use(ElementUI)

new Vue({
  router: router,
  el: '#app',
  render: h => h(App)
})

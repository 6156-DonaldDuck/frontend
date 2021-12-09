import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '~/routers/index.js'
import Conf from './config/config.json';
import store from '~/vuex/store.js'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.prototype.$appConfig = Conf;
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

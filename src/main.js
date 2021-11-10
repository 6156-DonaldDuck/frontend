import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '~/routers/index.js'
import Conf from './config/config.json';
import VueMarkdownEditor from '@kangc/v-md-editor';
import store from '~/vuex/store.js'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import hljs from 'highlight.js';

// markdown config
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.prototype.$appConfig = Conf;
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(VueMarkdownEditor)
Vue.use(VMdPreview)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

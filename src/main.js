// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import settings from './settings'
import { store } from './store/store'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$settings = settings
Vue.directive('title', {
  inserted (el, binding) {
    if (!binding.value) return
    document.title = binding.value
  },
  update (el, binding) {
    if (!binding.value) return
    document.title = binding.value
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

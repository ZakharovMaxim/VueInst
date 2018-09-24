import Vue from 'vue'
import Router from 'vue-router'
const mainPage = () => import('../pages/main.vue')
const userPage = () => import('../pages/user.vue')
const userSettings = () => import('../pages/user-settings.vue')
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: mainPage
  },
  {
    path: '/settings',
    component: userSettings
  },
  {
    path: '/:login',
    component: userPage
  }
]
export default new Router({
  mode: 'history',
  routes
})

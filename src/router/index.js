import Vue from 'vue'
import Router from 'vue-router'
const mainPage = () => import('@/views/MainPage.vue')
const userPage = () => import('@/views/UserPage.vue')
const userSettings = () => import('@/views/UserSettingsPage.vue')
const list = () => import('@/views/UserList.vue')
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
  },
  {
    path: '/:login/subscribers',
    components: {
      default: userPage,
      list
    },
    props: {
      default: false,
      list: {
        type: 'Подписчики',
        setter: 'setSubscribers',
        getter: 'getSubscribers'
      }
    }
  },
  {
    path: '/:login/subscribes',
    components: {
      default: userPage,
      list
    },
    props: {
      default: false,
      list: {
        type: 'Подписки',
        setter: 'setSubscribes',
        getter: 'getSubscribes'
      }
    }
  }
]
const router = new Router({
  mode: 'history',
  routes
})

export default router

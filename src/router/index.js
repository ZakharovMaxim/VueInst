import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'
const mainPage = () => import('../pages/main.vue')
const userPage = () => import('../pages/user.vue')
const userSettings = () => import('../pages/user-settings.vue')
const list = () => import('../components/popup-list.vue')
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
        callback: 'getSubscribers'
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
        callback: 'getSubscribes'
      }
    }
  }
]
const router = new Router({
  mode: 'history',
  routes
})

router.afterEach((to, from) => {
  if (to.path !== '/' && !store.getters.isAuth) {
    router.replace('/')
  }
})
export default router

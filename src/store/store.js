import vue from 'vue'
import vuex from 'vuex'
import App from './modules/App'
import Auth from './modules/Auth'
import NewPost from './modules/NewPost'
import Post from './modules/Post'
import User from './modules/User'

vue.use(vuex)

export const store = new vuex.Store({
  modules: [
    App, Auth, NewPost, Post, User
  ]
})

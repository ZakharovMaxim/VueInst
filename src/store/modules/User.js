import axios from '../../configs/axios'
import {SET_USER, SUB, UNSUB, CHANGE_AVATAR, REMOVE_AVATAR, CHANGE_PASSWORD, SET_SUBSCRIBERS, SET_SUBSCRIBES, CHANGE_INFO} from './types/User_types'
import {SET_POSTS} from './types/Post_types'
import {SET_TOKEN, UPDATE_USER_INFO, SET_AUTH} from './types/Auth_types'
export default {
  state: {
    userInfo: {},
    subscribers: [],
    subscribes: []
  },
  getters: {
    userInfo (state) {
      return state.userInfo
    },
    getSubscribers (state) {
      return state.subscribers
    },
    getSubscribes (state) {
      return state.subscribes
    }
  },
  actions: {
    [SET_USER] (store, login) {
      return axios
        .get('/user/getUser?login=' + login, {
          headers: { Authorization: true }
        })
        .then(data => {
          if (!data) throw new Error({status: 404, message: 'Пользователь не найден'})
          const user = {
            login: data.data.login,
            name: data.data.name,
            subscribersCount: data.data.subscribersCount,
            subscribesCount: data.data.subscribesCount,
            poster: data.data.poster,
            postsCount: data.data.posts.length,
            subscriber: data.data.subscriber,
            id: data.data._id
          }
          store.commit(SET_USER, {
            user
          })
          store.commit(SET_POSTS, data.data.posts)
          return data
        })
    },
    [SUB] ({commit}, id) {
      return axios
        .post('/user/subscribe', {user_id: id}, {
          headers: { Authorization: true }
        }).then(data => {
          commit(SUB, id)
        })
    },
    [UNSUB] ({commit}, id) {
      return axios
        .post('/user/unsubscribe', {user_id: id}, {
          headers: { Authorization: true }
        }).then(data => {
          commit(UNSUB, id)
        })
    },
    [CHANGE_AVATAR] ({commit}, data) {
      return axios
        .post('/user/changeAvatar', data, {
          headers: { Authorization: true, 'Content-Type': 'multipart/form-data' }
        }).then(data => {
          commit(UPDATE_USER_INFO, {
            poster: data.data.src
          })
          commit(SET_TOKEN, data.data.token)
        })
    },
    [REMOVE_AVATAR] ({commit}) {
      return axios
        .post('/user/removeAvatar', {}, {
          headers: {Authorization: true}
        }).then(data => {
          commit(UPDATE_USER_INFO, {
            poster: ''
          })
          commit(SET_TOKEN, data.data.token)
        })
    },
    [CHANGE_PASSWORD] ({commit}, payload) {
      return axios.post('/user/changePassword', payload, {
        headers: {Authorization: true}
      })
    },
    [SET_SUBSCRIBES] ({commit}, userLogin) {
      return axios.get('/user/getSubscribes?userLogin=' + userLogin, {
        headers: {Authorization: true}
      }).then(response => {
        commit(SET_SUBSCRIBES, response.data.list)
        return response
      })
    },
    [SET_SUBSCRIBERS] ({commit}, userLogin) {
      return axios.get('/user/getSubscribers?userLogin=' + userLogin, {
        headers: {Authorization: true}
      }).then(response => {
        commit(SET_SUBSCRIBERS, response.data.list)
        return response
      })
    },
    [CHANGE_INFO] ({commit}, payload) {
      commit(SET_AUTH, payload)
    }
  },
  mutations: {
    [SET_USER] (state, payload) {
      state.userInfo = payload.user
    },
    [SUB] (state, id) {
      toggleSub(state, id, true)
    },
    [UNSUB] (state, id) {
      toggleSub(state, id, false)
    },
    [SET_SUBSCRIBERS] (state, payload) {
      state.subscribers = payload
    },
    [SET_SUBSCRIBES] (state, payload) {
      state.subscribes = payload
    }
  }
}

function toggleSub (state, id, condition) {
  if (id === state.userInfo.id) {
    state.userInfo.subscriber = condition
    state.userInfo.subscribersCount = condition ? state.userInfo.subscribersCount + 1 : state.userInfo.subscribersCount - 1
  }
  let foundUser = state.subscribers.find(sub => sub._id === id)
  if (foundUser) foundUser.subscribed = condition
  foundUser = state.subscribes.find(sub => sub._id === id)
  if (foundUser) foundUser.subscribed = condition
}

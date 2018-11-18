import axios from '../../configs/axios'

export default {
  getUser ({commit}, login) {
    return axios
      .get('/user/getUser?login=' + login, {
        headers: { Authorization: true, withCredentials: true }
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
        commit('setUserInfo', {
          user,
          posts: data.data.posts
        })
        return data
      })
  },
  changeInfo ({commit}, payload) {
    commit('setToken', payload)
  },
  sub ({commit}, id) {
    return axios
      .post('/user/subscribe', {user_id: id}, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
        commit('sub', id)
      })
  },
  unsub ({commit}, id) {
    return axios
      .post('/user/unsubscribe', {user_id: id}, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
        commit('unsub', id)
      })
  },
  changeAvatar ({commit}, data) {
    return axios
      .post('/user/changeAvatar', data, {
        headers: { Authorization: true, withCredentials: true, 'Content-Type': 'multipart/form-data' }
      }).then(data => {
        commit('changeAvatar', {
          src: data.data.src,
          token: data.data.token
        })
      })
  },
  removeAvatar ({commit}) {
    return axios
      .post('/user/removeAvatar', {}, {
        headers: {Authorization: true, withCredentials: true}
      }).then(data => {
        commit('changeAvatar', {
          src: '',
          token: data.data.token
        })
      })
  },
  changePassword ({commit}, payload) {
    return axios.post('/user/changePassword', payload, {
      headers: {Authorization: true, withCredentials: true}
    })
  },
  getSubscribes ({commit}, userLogin) {
    return axios.get('/user/getSubscribes?userLogin=' + userLogin, {
      headers: {Authorization: true, withCredentials: true}
    }).then(response => {
      commit('setSubscribes', response.data.list)
      return response
    })
  },
  getSubscribers ({commit}, userLogin) {
    return axios.get('/user/getSubscribers?userLogin=' + userLogin, {
      headers: {Authorization: true, withCredentials: true}
    }).then(response => {
      commit('setSubscribers', response.data.list)
      return response
    })
  }
}

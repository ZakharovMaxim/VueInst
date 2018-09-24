import axios from 'axios'
export default {
  getUser ({commit}, login) {
    const token = localStorage.getItem('token')
    return axios
      .get('http://localhost:3000/user/getUser?login=' + login, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      })
      .then(data => {
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
        commit('setPosts', data.data.posts)
        commit('setUserInfo', user)
        return data
      })
      .catch(e => {
        console.dir(e)
      })
  },
  changeInfo ({commit}, payload) {
    commit('setToken', payload)
  },
  sub ({commit}, id) {
    const token = localStorage.getItem('token')
    return axios
      .post('http://localhost:3000/user/subscribe', {user_id: id}, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      }).then(data => {
        commit('sub', id)
      }).catch(e => {
        console.log(e)
      })
  },
  unsub ({commit}, id) {
    const token = localStorage.getItem('token')
    return axios
      .post('http://localhost:3000/user/unsubscribe', {user_id: id}, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      }).then(data => {
        commit('unsub', id)
      }).catch(e => {
        console.log(e)
      })
  },
  changeAvatar ({commit}, data) {
    const token = localStorage.getItem('token')
    return axios
      .post('http://localhost:3000/user/changeAvatar', data, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true, 'Content-Type': 'multipart/form-data' }
      }).then(data => {
        commit('changeAvatar', {
          src: data.data.src,
          token: data.data.token
        })
      })
  },
  removeAvatar ({commit}) {
    const token = localStorage.getItem('token')
    return axios
      .post('http://localhost:3000/user/removeAvatar', {}, {
        headers: {Authorization: `JWT ${token}`, withCredentials: true}
      }).then(data => {
        console.log(data)
        commit('changeAvatar', {
          src: '',
          token: data.data.token
        })
      })
  },
  changePassword ({commit}, payload) {
    const token = localStorage.getItem('token')
    return axios.post('http://localhost:3000/user/changePassword', payload, {
      headers: {Authorization: `JWT ${token}`, withCredentials: true}
    })
  }
}

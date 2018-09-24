import axios from 'axios'
export default {
  setPosts ({ commit }) {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:3000/user/getAllPosts', {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      })
      .then(data => {
        commit('setPosts', data.data)
      })
      .catch(e => {
        console.dir(e)
      })
  },
  like ({commit}, payload) {
    const token = localStorage.getItem('token')
    commit('like', payload)
    axios
      .post('http://localhost:3000/user/like', {post_id: payload}, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      }).then(data => {
      }).catch(e => {
        console.log(e)
      })
  },
  dislike ({commit}, payload) {
    const token = localStorage.getItem('token')
    commit('dislike', payload)
    axios
      .post('http://localhost:3000/user/dislike', {post_id: payload}, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      }).then(data => {
      }).catch(e => {
        console.log(e)
      })
  },
  newComment ({commit}, payload) {
    const token = localStorage.getItem('token')
    axios
      .post('http://localhost:3000/user/comment', payload, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      }).then(data => {
        payload._id = data.data
        commit('comment', payload)
      }).catch(e => {
        console.log(e)
      })
  },
  removeComment ({commit}, payload) {
    const token = localStorage.getItem('token')
    axios
      .post('http://localhost:3000/user/removeComment', payload, {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      }).then(data => {
        commit('removeComment', payload)
      }).catch(e => {
        console.log(e)
      })
  }
}

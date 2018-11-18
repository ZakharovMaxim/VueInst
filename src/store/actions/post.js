import axios from '../../configs/axios'

export default {
  setPosts ({ commit }) {
    return axios
      .get('/user/getAllPosts', {
        headers: { Authorization: true, withCredentials: true }
      })
      .then(data => {
        commit('setPosts', data.data)
      })
  },
  like ({commit}, payload) {
    commit('like', payload)
    axios
      .post('/user/like', {post_id: payload}, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
      }).catch(e => {
        console.log(e)
      })
  },
  dislike ({commit}, payload) {
    commit('dislike', payload)
    axios
      .post('/user/dislike', {post_id: payload}, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
      })
  },
  newComment ({commit}, payload) {
    axios
      .post('/user/comment', payload, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
        payload._id = data.data
        commit('comment', payload)
      })
  },
  removeComment ({commit}, payload) {
    axios
      .post('/user/removeComment', payload, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
        commit('removeComment', payload)
      })
  },
  removePost ({commit}, postId) {
    axios
      .delete(`/user/removePost/${postId}?type=post`, {
        headers: { Authorization: true, withCredentials: true }
      }).then(data => {
        commit('removePost', postId)
      })
  }
}

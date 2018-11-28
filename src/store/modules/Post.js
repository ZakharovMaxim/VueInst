import axios from '../../configs/axios'
import {SET_POSTS, LIKE, DISLIKE, NEW_COMMENT, REMOVE_COMMENT, REMOVE_POST} from './types/Post_types'

export default {
  state: {
    posts: null
  },
  getters: {
    posts (state) {
      return state.posts
    }
  },
  actions: {
    [SET_POSTS] ({ commit }) {
      return axios
        .get('/user/getAllPosts', {
          headers: { Authorization: true }
        })
        .then(data => {
          commit(SET_POSTS, data.data)
        })
    },
    [LIKE] (store, postId) {
      store.commit(LIKE, {
        postId,
        userId: store.getters.currentUser.id
      })
      return axios
        .post('/user/like', {post_id: postId}, {
          headers: { Authorization: true }
        })
    },
    [DISLIKE] (store, postId) {
      store.commit(DISLIKE, {
        postId,
        userId: store.getters.currentUser.id
      })
      return axios
        .post('/user/dislike', {post_id: postId}, {
          headers: { Authorization: true }
        })
    },
    [NEW_COMMENT] (store, payload) {
      return axios
        .post('/user/comment', payload, {
          headers: { Authorization: true }
        }).then(data => {
          payload._id = data.data
          payload.user_id = store.getters.currentUser
          payload.user_id._id = payload.user_id.id
          store.commit(NEW_COMMENT, payload)
        })
    },
    [REMOVE_COMMENT] ({commit}, payload) {
      return axios
        .post('/user/removeComment', payload, {
          headers: { Authorization: true }
        }).then(data => {
          commit(REMOVE_COMMENT, payload)
        })
    },
    [REMOVE_POST] ({commit}, postId) {
      return axios
        .delete(`/user/removePost/${postId}?type=post`, {
          headers: { Authorization: true }
        }).then(data => {
          commit(REMOVE_POST, postId)
        })
    }
  },
  mutations: {
    [SET_POSTS] (state, payload) {
      state.posts = [].concat(payload)
    },
    [LIKE] (state, payload) {
      const post = state.posts.find(post => post._id === payload.postId)
      post.likes.push(payload.userId)
    },
    [DISLIKE] (state, payload) {
      const post = state.posts.find(post => post._id === payload.postId)
      const index = post.likes.indexOf(payload.userId)
      post.likes.splice(index, 1)
    },
    [NEW_COMMENT] (state, payload) {
      const post = state.posts.find(post => post._id === payload.post_id)
      post.comments.push(
        payload
      )
    },
    [REMOVE_COMMENT] (state, payload) {
      const post = state.posts.find(post => post._id === payload.post_id)
      if (!post) return
      const index = post.comments.findIndex(comment => comment._id === payload.id)
      if (index !== -1) post.comments.splice(index, 1)
    },
    [REMOVE_POST] (state, postId) {
      const index = state.posts.findIndex(post => post._id === postId)
      if (!~index) return
      state.posts.splice(index, 1)
    }
  }
}

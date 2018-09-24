export default {
  setPosts (state, payload) {
    state.posts = [].concat(payload)
  },
  like (state, payload) {
    const post = state.posts.find(post => post._id === payload)
    post.likes.push(state.user.id)
  },
  dislike (state, payload) {
    const post = state.posts.find(post => post._id === payload)
    const index = post.likes.indexOf(state.user.id)
    post.likes.splice(index, 1)
  },
  comment (state, payload) {
    const post = state.posts.find(post => post._id === payload.post_id)
    payload.user_id = state.user
    payload.user_id._id = payload.user_id.id
    post.comments.push(
      payload
    )
  },
  removeComment (state, payload) {
    const post = state.posts.find(post => post._id === payload.post_id)
    if (!post) return
    const index = post.comments.findIndex(comment => comment._id === payload.id)
    if (index !== -1) post.comments.splice(index, 1)
  }
}

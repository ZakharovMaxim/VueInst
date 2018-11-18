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
export default {
  setUserInfo (state, payload) {
    state.userInfo = payload.user
    state.posts = payload.posts
  },
  sub (state, id) {
    toggleSub(state, id, true)
  },
  unsub (state, id) {
    toggleSub(state, id, false)
  },
  changeAvatar (state, payload) {
    state.user.poster = payload.src
    if (payload.token) {
      state.token = payload.token
      localStorage.setItem('token', payload.token)
    }
  },
  setSubscribers (state, payload) {
    state.subscribers = payload
  },
  setSubscribes (state, payload) {
    state.subscribes = payload
  }
}

export default {
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  sub (state, id) {
    state.userInfo.subscriber = true
    state.userInfo.subscribersCount++
  },
  unsub (state, id) {
    state.userInfo.subscriber = false
    state.userInfo.subscribersCount--
  },
  changeAvatar (state, payload) {
    console.log(payload)
    state.user.poster = payload.src
    if (payload.token) {
      state.token = payload.token
      localStorage.setItem('token', payload.token)
    }
  }
}

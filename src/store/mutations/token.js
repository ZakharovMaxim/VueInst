export default {
  setToken (state, payload) {
    localStorage.setItem('token', payload.token)
    state.token = payload.token
    state.user = payload.user
    if (payload.token) state.login = true
    else state.login = false
  }
}

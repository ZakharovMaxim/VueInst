let b64DecodeUnicode = str =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str), c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''))

let parseJwt = token =>
  JSON.parse(
    b64DecodeUnicode(
      token.split('.')[1].replace('-', '+').replace('_', '/')
    )
  )
export default {
  setToken ({ commit }, payload) {
    console.log(payload)
    localStorage.setItem('token', payload.token)
    commit('setToken', payload)
  },
  removeToken ({ commit }) {
    localStorage.setItem('token', '')
    commit('setToken', '')
  },
  getToken ({ commit }) {
    let token = localStorage.getItem('token') || ''
    if (!token) return commit('setToken', {token: '', user: {}})
    const user = parseJwt(token)
    if (token) commit('setToken', {token, user})
  }
}

import parseJwt from '../../tools/parseJWT'
import {SET_AUTH, INIT_AUTH, LOGOUT, UPDATE_USER_INFO, SET_TOKEN} from './types/Auth_types'
export default {
  state: {
    token: null,
    user: null
  },
  getters: {
    isAuth (state) {
      return !!state.token
    },
    token (state) {
      return state.token
    },
    currentUser (state) {
      return state.user
    }
  },
  actions: {
    [SET_AUTH] ({commit}, payload) {
      commit(SET_AUTH, payload)
    },
    [INIT_AUTH] ({commit}) {
      let token = localStorage.getItem('token') || ''
      if (!token) return commit(SET_AUTH, {token: '', user: {}})
      const user = parseJwt(token)
      if (!user) token = ''
      commit(SET_AUTH, {token, user})
    },
    [LOGOUT] ({commit}) {
      localStorage.setItem('token', '')
      commit(SET_AUTH, {token: null, user: null})
    }
  },
  mutations: {
    [SET_AUTH] (state, payload) {
      this.commit(SET_TOKEN, payload.token)
      state.user = {
        ...state.user,
        ...payload.user
      }
    },
    [UPDATE_USER_INFO] (state, payload) {
      state.user = {
        ...state.user,
        ...payload
      }
    },
    [SET_TOKEN] (state, payload = '') {
      localStorage.setItem('token', payload)
      state.token = payload
    }
  }
}

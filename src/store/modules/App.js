import axios from '../../configs/axios'
import {FIX_NAVIGATION, UN_FIX_NAVIGATION, SEARCH} from './types/App_types'

export default {
  state: {
    fixedNavigation: false,
    searchResult: []
  },
  getters: {
    fixedNavigation (state) {
      return state.fixedNavigation
    },
    searchResult (state) {
      return state.searchResult
    }
  },
  actions: {
    [FIX_NAVIGATION] ({commit}) {
      commit(FIX_NAVIGATION)
    },
    [UN_FIX_NAVIGATION] ({commit}) {
      commit(UN_FIX_NAVIGATION)
    },
    [SEARCH] ({commit}, s) {
      if (!s) return commit(SEARCH, [])
      axios.get('/search?s=' + s).then(data => {
        commit(SEARCH, data.data)
      })
    }
  },
  mutations: {
    [FIX_NAVIGATION] (state) {
      state.fixedNavigation = true
    },
    [UN_FIX_NAVIGATION] (state) {
      state.fixedNavigation = false
    },
    [SEARCH] (state, payload) {
      state.searchResult = payload
    }
  }
}

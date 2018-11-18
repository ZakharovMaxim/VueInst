import vue from 'vue'
import vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
vue.use(vuex)

export const store = new vuex.Store({
  state: {
    user: {},
    userInfo: {},
    login: false,
    posts: null,
    token: null,
    fixedNavigation: false,
    searchResult: [],
    filters: [],
    appliedFilters: [],
    filteredImg: null,
    subscribers: [],
    subscribes: [],
    loading: false
  },
  getters,
  mutations,
  actions
})

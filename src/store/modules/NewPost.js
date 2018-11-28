import axios from '../../configs/axios'
import filters from '../../tools/filters'
import {INIT_FILTER, ADD_FILTER, REMOVE_FILTER, CHANGE_FILTER_VALUE, SET_FILTERS, PRE_SAVE, SAVE_POST} from './types/NewPost_types'

export default {
  state: {
    filters: [],
    appliedFilters: [],
    filteredImg: null
  },
  getters: {
    filters (state) {
      return state.filters
    },
    appliedFilters (state) {
      return state.filters.filter(f => f.active)
    },
    filteredImg (state) {
      return state.filteredImg
    }
  },
  actions: {
    [INIT_FILTER] ({commit}) {
      commit(INIT_FILTER, filters)
    },
    [ADD_FILTER] ({commit}, filter) {
      commit(ADD_FILTER, filter)
    },
    [REMOVE_FILTER] ({commit}, filterName) {
      commit(REMOVE_FILTER, filterName)
    },
    [CHANGE_FILTER_VALUE] ({commit}, payload) {
      commit(CHANGE_FILTER_VALUE, payload)
    },
    [SET_FILTERS] ({commit}, filters) {
      commit(SET_FILTERS, filters)
    },
    [PRE_SAVE] ({commit}, img) {
      commit(PRE_SAVE, img)
    },
    [SAVE_POST] (store, description) {
      const image = store.getters.filteredImg
      const data = {
        image,
        description
      }
      return axios.post('/user/addPost', data, {
        headers: { Authorization: true }
      })
    }
  },
  mutations: {
    [ADD_FILTER] (state, filterName) {
      const newFilters = [].concat(state.filters)
      const filter = newFilters.find(f => f.canvasName === filterName)
      filter.active = true
      state.filters = newFilters
    },
    [REMOVE_FILTER] (state, filterName) {
      state.filters.forEach(f => {
        if (f.canvasName === filterName) f.active = false
      })
    },
    [CHANGE_FILTER_VALUE] (state, payload) {
      const filter = state.filters.find(filter => filter.canvasName === payload.canvasName)
      if (!filter) return
      filter.value = payload.value
    },
    [PRE_SAVE] (state, img) {
      state.filteredImg = img
    },
    [SET_FILTERS] (state, settings) {
      state.filters.forEach(filter => {
        let found = false
        settings.forEach(setting => {
          if (setting.type === filter.canvasName) {
            filter.value = setting.value
            filter.active = true
            found = true
          }
        })
        if (found) filter.active = true
        else filter.active = false
      })
    },
    [INIT_FILTER] (state, filters) {
      state.filters = filters
    }
  }
}

import axios from '../../configs/axios'
import filters from '../../tools/filters.js'
export default {
  initFilters ({commit}) {
    commit('initFilters', filters)
  },
  addFilter ({commit}, filter) {
    commit('addFilter', filter)
  },
  removeFilter ({commit}, filterName) {
    commit('removeFilter', filterName)
  },
  changeFilterValue ({commit}, payload) {
    commit('changeFilterValue', payload)
  },
  setFilters ({commit}, filters) {
    commit('setFilters', filters)
  },
  preSave ({commit}, img) {
    commit('preSave', img)
  },
  savePost (ctx) {
    const image = ctx.getters.filteredImg
    const description = ''
    const data = {
      image,
      description
    }
    return axios.post('/user/addPost', data, {
      headers: { Authorization: true, withCredentials: true }
    })
  }
}

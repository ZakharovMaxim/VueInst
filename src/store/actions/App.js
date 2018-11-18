import axios from '../../configs/axios'
export default {
  fixNavigation ({commit}) {
    commit('fixNavigation')
  },
  unFixNavigation ({commit}) {
    commit('unFixNavigation')
  },
  search ({commit}, s) {
    if (!s) return commit('setSearch', [])
    axios.get('/search?s=' + s).then(data => {
      commit('setSearch', data.data)
    })
  }
}

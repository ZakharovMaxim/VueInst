import axios from 'axios'
export default {
  fixNavigation ({commit}) {
    commit('fixNavigation')
  },
  unFixNavigation ({commit}) {
    commit('unFixNavigation')
  },
  search ({commit}, s) {
    if (!s) return commit('setSearch', [])
    axios.get('http://localhost:3000/search?s=' + s).then(data => {
      commit('setSearch', data.data)
    }).catch(e => {
      console.log(e)
    })
  }
}

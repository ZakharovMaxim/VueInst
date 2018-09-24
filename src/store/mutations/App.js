export default {
  fixNavigation (state) {
    state.fixedNavigation = true
  },
  unFixNavigation (state) {
    state.fixedNavigation = false
  },
  setSearch (state, payload) {
    state.searchResult = payload
  }
}

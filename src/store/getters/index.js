export default {
  isAuth (state) {
    return state.login
  },
  token (state) {
    return state.token
  },
  posts (state) {
    return state.posts
  },
  currentUser (state) {
    return state.user
  },
  fixedNavigation (state) {
    return state.fixedNavigation
  },
  userInfo (state) {
    return state.userInfo
  },
  searchResult (state) {
    return state.searchResult
  },
  filters (state) {
    return state.filters
  },
  appliedFilters (state) {
    return state.filters.filter(f => f.active)
  },
  filteredImg (state) {
    return state.filteredImg
  },
  getSubscribers (state) {
    return state.subscribers
  },
  getSubscribes (state) {
    return state.subscribes
  }
}

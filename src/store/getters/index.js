export default {
  isAuth (state) {
    return state.login
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
  }
}

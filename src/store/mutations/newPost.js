export default {
  addFilter (state, filterName) {
    const newFilters = [].concat(state.filters)
    const filter = newFilters.find(f => f.canvasName === filterName)
    filter.active = true
    state.filters = newFilters
  },
  removeFilter (state, filterName) {
    state.filters.forEach(f => {
      if (f.canvasName === filterName) f.active = false
    })
  },
  changeFilterValue (state, payload) {
    const filter = state.filters.find(filter => filter.canvasName === payload.canvasName)
    if (!filter) return
    filter.value = payload.value
  },
  preSave (state, img) {
    state.filteredImg = img
  },
  setFilters (state, settings) {
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
  initFilters (state, filters) {
    state.filters = filters
  }
}

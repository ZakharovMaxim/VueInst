<template>
  <div class="filter-complete">
    <div class="filter-complete__name">{{setting.name}}</div>
    <div class="filter-complete__preview" @click='toggleState'>
      <canvas-image :src='src' :filters='appliedFilters' />
    </div>
  </div>
</template>

<script>
import canvasImage from './canvas-image'
export default {
  name: 'filter-complete',
  data () {
    return {
      appliedFilters: this.applyFilter()
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      required: true
    },
    setting: {
      type: Object,
      required: true
    }
  },
  methods: {
    applyFilter () {
      const result = []
      this.setting.settings.forEach(setting => {
        this.filters.forEach(filter => {
          if (filter.canvasName === setting.type) {
            const copy = {}
            Object.assign(copy, filter)
            copy.value = setting.value
            result.push(copy)
          }
        })
      })
      return result
    },
    toggleState () {
      this.$store.dispatch('setFilters', this.setting.settings)
    }
  },
  components: {canvasImage}
}
</script>

<style scoped>
.filter-complete {
  width: 30%;
  padding: 5px;
  margin-right: 5%;
  border: 1px solid transparent;
  transition: all .2s;
}
.filter-complete-active {
  border-color: #3897F0;
}
.filter-complete img {
  width: 100%;
}
.filter-complete:nth-child(3n) {
  margin-right: 0;
}
.filter-complete__name {
  font-size: 10px;
  font-weight: bold;
  color: #C0BBBB;
  margin-bottom: 5px;
}
.filter-complete__preview {
  cursor: pointer;
}
</style>

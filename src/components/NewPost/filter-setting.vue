<template>
  <div class="filter-setting" :class='{"filter-setting-active": filter.active}'>
    <div class="filter-setting__name">{{ filter.name }}</div>
    <div class="filter-setting__preview" @click='toggleState'>
      <canvas-image :src='src' :filters='[filter]' :present='true'/>
    </div>
    <toddler :max='filter.max' :min='filter.min' :initialValue='this.filter.value' v-show='filter.active' @changed='change'/>
  </div>
</template>

<script>
import canvasImage from './canvas-image'
import toddler from '../Controlls/toddler'
export default {
  name: 'filter-setting',
  props: {
    src: {
      type: String,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleState () {
      if (this.filter.active) {
        this.$store.dispatch('removeFilter', this.filter.canvasName)
      } else {
        this.$store.dispatch('addFilter', this.filter.canvasName)
      }
    },
    change (value) {
      this.$store.dispatch('changeFilterValue', {
        value,
        canvasName: this.filter.canvasName
      })
    }
  },
  components: {canvasImage, toddler}
}
</script>

<style scoped>
.filter-setting {
  width: 24%;
  padding: 5px;
  margin-right: 1%;
  border: 1px solid transparent;
  transition: all .2s;
}
.filter-setting-active {
  border-color: #3897F0;
}
.filter-setting img {
  width: 100%;
}
.filter-setting:nth-child(3n) {
  margin-right: 0;
}
.filter-setting__name {
  font-size: 10px;
  font-weight: bold;
  color: #C0BBBB;
  margin-bottom: 5px;
}
.filter-setting__preview {
  cursor: pointer;
}
</style>

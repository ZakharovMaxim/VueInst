<template>
  <div class="filter" :class='{"filter-active": active}'>
    <div class="filter__name">{{ filter.name }}</div>
    <div class="filter__preview" @click='toggleState'>
      <canvas-image :src='src' :filters='[filter]'/>
    </div>
    <toddler :max='filter.max' :min='filter.min' :initialValue='value' v-show='active' @changed='change'/>
  </div>
</template>

<script>
import canvasImage from './canvas-image'
import toddler from './toddler'
export default {
  name: 'post-filter',
  data () {
    return {
      active: false,
      value: this.filter.defaultValue
    }
  },
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
      if (this.active) {
        this.$emit('unselect', this.filter.canvasName)
      } else {
        this.$emit('select', {
          ...this.filter,
          value: this.value
        })
      }
      this.active = !this.active
    },
    change (value) {
      this.value = value
      this.$emit('changed', {
        value,
        canvasName: this.filter.canvasName
      })
    }
  },
  components: {canvasImage, toddler}
}
</script>

<style scoped>
.filter {
  width: 30%;
  padding: 5px;
  margin-right: 5%;
  border: 1px solid transparent;
  transition: all .2s;
}
.filter-active {
  border-color: #3897F0;
}
.filter img {
  width: 100%;
}
.filter:nth-child(3n) {
  margin-right: 0;
}
.filter__name {
  font-size: 10px;
  font-weight: bold;
  color: #C0BBBB;
  margin-bottom: 5px;
}
.filter__preview {
  cursor: pointer;
}
</style>

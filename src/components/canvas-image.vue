<template>
  <div>
    <canvas ref='canvas' />
    <div v-show='false'>{{f && f.map(f => f.value)}} {{src}}</div>
  </div>
</template>

<script>
export default {
  name: 'canvas-image',
  data () {
    return {
      f: this.filters
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      default () {
        return []
      }
    }
  },
  updated () {
    console.log('update')
    this.draw()
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = this.src
      const that = this
      img.onload = function () {
        // let percent = this.height / this.width * 100
        let proportions = this.height / this.width
        canvas.width = canvas.parentNode.clientWidth
        canvas.height = canvas.width * proportions
        ctx.filter = that.filters.length ? that.filters.map(filter => {
          return `${filter.canvasName}(${filter.value || filter.defaultValue}${filter.units})`
        }).join(' ') : 'none'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>

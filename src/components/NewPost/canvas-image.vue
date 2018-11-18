<template>
  <div>
    <canvas ref='canvas' />
    <div v-show='false'>{{filters && filters.map(f => f.value)}} {{src}}</div>
  </div>
</template>

<script>
export default {
  name: 'canvas-image',
  props: {
    src: {
      type: String,
      required: true
    },
    main: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Array,
      default () {
        return []
      }
    },
    present: {
      type: Boolean,
      default: false
    }
  },
  updated () {
    this.draw()
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const canvas = this.$refs.canvas
      const img = new Image()
      img.src = this.src
      const that = this
      img.onload = function () {
        let proportions = this.height / this.width
        canvas.width = canvas.parentNode.clientWidth
        canvas.height = canvas.width * proportions
        const ctx = canvas.getContext('2d')
        ctx.filter = that.filters.length ? that.filters.map(filter => {
          return `${filter.canvasName}(${that.present ? filter.presentValue : filter.value}${filter.units})`
        }).join(' ') : 'none'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const filteredImage = canvas.toDataURL('image/png')
        if (that.main) {
          that.$store.dispatch('preSave', filteredImage)
        }
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

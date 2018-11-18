<template>
  <div class='toddler' @mousemove.stop.prevent='change' @mouseleave.stop.prevent='out' @mouseup.stop.prevent="off">
    <div class="toddler__line" ref='line'>
      <div class="toddler__handle" @mousedown.stop.prevent="on" :style='{"left": left + "%"}'></div>
      <div class="toddler__value" :style='{"left": left + "%"}' :class='{"toddler__value-right": left > 90}'>{{initialValue | toFixed}}</div>
      <div class="toddler__before" :style='{"width": leftWidth + "%"}'></div>
      <div class="toddler__after" :style='{"width": rightWidth + "%"}'></div>
    </div>
    <div class="toddler__values">
      <div class="toddler__min">{{min}}</div>
      <div class="toddler__min">{{max}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toddler',
  data () {
    return {
      active: false,
      lastX: null,
      value: this.initialValue
    }
  },
  computed: {
    left () {
      return (this.initialValue - this.min) / (this.max - this.min) * 100 - 2
    },
    leftWidth () {
      return this.left - 1
    },
    rightWidth () {
      return 100 - this.leftWidth
    }
  },
  filters: {
    toFixed (v) {
      return +v.toFixed(2)
    }
  },
  updated () {
    this.value = this.initialValue
  },
  methods: {
    change (e) {
      if (!this.active) return
      if (!this.lastX) this.lastX = e.clientX
      const diff = e.clientX - this.lastX
      const line = this.$refs.line
      const percent = diff / line.clientWidth * 100
      this.lastX = e.clientX
      let step = (this.max - this.min) / 100 * percent
      if (this.value + step > this.max) {
        this.value = this.max
      } else if (this.value + step < this.min) {
        this.value = this.min
      } else {
        this.value += step
      }
      this.$emit('changed', this.value)
    },
    off () {
      this.active = false
      this.lastX = null
      this.lastY = null
    },
    out (e) {
      const to = e.toElement
      if (~Array.prototype.indexOf.call(e.currentTarget.childNodes, to) && e.currentTarget !== e.target) return
      this.off()
    },
    on (e) {
      this.active = true
    }
  },
  props: {
    max: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 0
    },
    initialValue: {
      type: Number
    }
  }
}
</script>

<style scoped>
  .toddler {
    padding-top: 10px;
  }
  .toddler__line {
    width: 100%;
    height: 3px;
    position: relative;
    margin-bottom: 5px;
  }
  .toddler__before, .toddler__after {
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    max-width: 100%;
  }
  .toddler__before {
    left: 0;
    background: #3897F0;
    border-radius: 5px 0 0 5px;
  }
  .toddler__after {
    right: 0;
    background: #ccc;
    border-radius: 0 5px 5px 0;
  }
  .toddler__handle {
    width: 13px;
    height: 13px;
    background: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
    border: 1px solid #fff;
  }
  .toddler__value {
    position: absolute;
    top: -18px;
    font-size: 10px;
    text-align: center;
    left: 0;
    transform: translateX(10px);
    transition: all .2s;
  }
  .toddler__value-right {
    transform: translateX(-20px);
  }
  .toddler__values {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
  }
</style>

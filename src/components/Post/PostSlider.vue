<template>
  <div class='postSlider' @click.self='close' :class='{"postSlider--fixed": fixedTop}'>
    <div class='postSlider__prev postSlider__controlls' @click='prev'></div>
    <div class='postSlider__next postSlider__controlls' @click='next'></div>
    <div class='postSlider__close'>
      <span class='icon-cross-out' @click.self='close'></span>
    </div>
    <div class='postSlider__slides' ref='slides' @click.self='close'>
      <PostContainer v-for='(slide, i) in slides' :key='slide._id' :post='slide' postType='full' v-show='i === index' />
    </div>
  </div>
</template>
<script>
import PostContainer from '../Post/PostContainer'

export default {
  name: 'PostSlider',
  components: { PostContainer },
  props: {
    slides: {
      type: Array,
      default () {
        return []
      }
    },
    start: String
  },
  data () {
    return {
      current: this.start,
      index: 0,
      fixedTop: false
    }
  },
  computed: {
    length () {
      return this.slides.length
    }
  },
  watch: {
    slides () {
      if (this.index >= this.slides.length) this.index = 0
    }
  },
  created () {
    this.index = this.slides.findIndex(slide => slide._id === this.start)
  },
  mounted () {
    window.addEventListener('resize', () => this.checkTopOffset())
    this.checkTopOffset()
  },
  methods: {
    checkTopOffset () {
      const content = this.$refs['slides']
      if (!content) return
      if (window.innerHeight <= content.clientHeight) {
        this.fixedTop = true
      } else {
        this.fixedTop = false
      }
    },
    close (e) {
      this.$emit('close')
    },
    prev () {
      this.index--
      if (this.index < 0) this.index = this.length - 1
    },
    next () {
      this.index = ++this.index % this.length
    }
  }
}
</script>

<style scoped>
  .postSlider {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;
    overflow: auto;
  }
  .postSlider--fixed {
    align-items: flex-start;
  }
  .postSlider__slides {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .postSlider__controlls {
    display: flex;
    width: 50px;
    height: 50px;
    background: rgba(0,0,0,.5);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    cursor: pointer;
    z-index: 2;
  }
  .postSlider__controlls:before, .postSlider__controlls:after {
    content: '\f106';
    font-family: 'Flaticon';
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .postSlider__controlls:before {
    font-size: 28px;
    color: #219653;
    transform: translate(-35%, -50%);
  }
  .postSlider__controlls:after {
    font-size: 18px;
    color: #F2C94C;
    transform: translate(-65%, -50%);
  }
  .postSlider__prev {
    transform: rotate(180deg);
    transform-origin: 50% 50%;
    left: 30px;
  }
  .postSlider__next {
    right: 30px;
  }
  .postSlider__close {
    position: fixed;
    top: 10px;
    right: 20px;
    cursor: pointer;
  }
  @media screen and (max-width: 860px) {
    .postSlider__controlls {
      width: 30px;
      height: 30px;
    }
    .postSlider__controlls:before {
      font-size: 16px;
    }
    .postSlider__controlls:after {
      font-size: 9px;
    }
    .postSlider__prev {
      left: 20px;
    }
    .postSlider__next {
      right: 20px;
    }
  }
</style>

<template>
  <div class='postSlider' @click='close'>
    <div class="postSlider__prev postSlider__controlls" @click='prev'></div>
    <div class="postSlider__next postSlider__controlls" @click='next'></div>
    <div class="postSlider__close" @click='close($event, true)'>
      <span class="icon-cross-out"></span>
    </div>
    <Post v-for='(slide, i) in slides' :key='slide._id' :post='slide' :postType='"full"' v-show='i === index'/>
  </div>
</template>
<script>
import Post from '../Post/post'
export default {
  name: 'post-slider',
  components: {Post},
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
      index: 0
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
  methods: {
    close (e, forse) {
      if (e.target === this.$el || forse) this.$emit('close')
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
    right: 10px;
  }
</style>

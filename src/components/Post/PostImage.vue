<template>
  <div class='post_img' :class='{"active-like": activeLike}' @click='handleClick'>
    <img :src='src' alt=''>
    <svg
    version='1.1'
    id='Capa_2'
    xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 51.997 51.997'
    style='enable-background:new 0 0 51.997 51.997;'
    xml:space='preserve'>
      <path d='M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
    c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
    c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z'/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'PostImage',
  props: {
    src: {
      type: String,
      required: true
    },
    liked: Boolean,
    postType: String,
    postId: String
  },
  data () {
    return {
      timer: null,
      activeLikeTimer: null,
      clicks: 0,
      activeLike: false
    }
  },
  methods: {
    handleClick () {
      this.like()
    },
    fullMode () {
      this.$emit('full', this.postId)
    },
    like () {
      if (this.clicks === 0) {
        this.clicks++
        this.timer = setTimeout(() => {
          this.clicks = 0
          this.timer = null
        }, 200)
      } else {
        if (!this.liked) this.$emit('like')
        this.activeLike = true
        clearTimeout(this.activeLikeTimer)
        this.activeLikeTimer = setTimeout(() => {
          this.activeLike = false
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.post_img {
  position: relative;
}
svg {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
path {
  fill: black;
  width: 100%;
  opacity: 0;
  transition: opacity .4s;
}
.post_img.active-like path {
  opacity: .5;
}
</style>

<template>
  <div class='content'>
      <div class='posts' :class='{"posts-grid": postType === "short"}'>
          <PostContainer v-for='post in posts' :key='post._id' :post='post' :postType='postType' @click='activeFullMode' />
          <div class='posts__empty' v-if='posts && posts.length === 0'>Постов нет :(</div>
      </div>
      <PostSlider :slides='posts' :start='fullModeStart' v-if='fullMode' @close='offFullMode' />
  </div>
</template>
<script>
import PostContainer from './PostContainer'
import PostSlider from './PostSlider'
export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      default () {
        return []
      }
    },
    postType: {
      type: String
    }
  },
  components: {PostContainer, PostSlider},
  methods: {
    activeFullMode (id) {
      this.fullMode = true
      this.fullModeStart = id
      document.documentElement.style.overflow = 'hidden'
    },
    offFullMode () {
      this.fullMode = false
      this.fullModeStart = null
      document.documentElement.style.overflow = ''
    }
  },
  data () {
    return {
      fullMode: false,
      fullModeStart: null
    }
  }
}
</script>
<style scoped>
.posts {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
}
.posts-grid {
  justify-content: flex-start;
}
</style>

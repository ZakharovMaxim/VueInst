<template>
    <div class="content">
        <div class="posts" :class='{"posts-grid": postType === "user"}'>
            <post v-for='post in posts' :key='post._id' :post='post' :postType='postType' @full='activeFullMode'/>
            <div class="posts__empty" v-if='posts && posts.length === 0'>Постов нет :(</div>
        </div>
        <post-slider :slides='posts' :start='fullModeStart' v-if='fullMode' @close='offFullMode'/>
    </div>
</template>
<script>
import Post from './post'
import PostSlider from '../PostSlider/post-slider'
export default {
  name: 'post-list',
  props: {
    posts: {
      type: Array,
      default () {
        return []
      }
    },
    postType: {
      type: String,
      default () {
        return 'subs'
      }
    }
  },
  components: {Post, PostSlider},
  methods: {
    activeFullMode (id) {
      this.fullMode = true
      this.fullModeStart = id
    },
    offFullMode () {
      this.fullMode = false
      this.fullModeStart = null
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

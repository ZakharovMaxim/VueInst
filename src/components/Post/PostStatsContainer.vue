<template>
  <div class='post-stats'>
    <div class='post-stats_icons'>
      <PostLike :active='liked' @click='like' />
      <span class='icon-comment' @click='focus'></span>
    </div>
    <div class='post-stats_total-likes'>
      <p>{{likes}} отметок 'Нравится'</p>
    </div>
  </div>
</template>

<script>
import PostLike from './PostLike'
export default {
  name: 'PostStatsContainer',
  components: { PostLike },
  props: {
    liked: {
      type: Boolean,
      default: false
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  methods: {
    focus () {
      this.$emit('focus')
    },
    like () {
      this.$emit('onLike')
    }
  }
}
</script>

<style scoped>
.post-stats_icons {
  display: flex;
  align-items: center;
}
.post-stats_total-likes {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 13px;
  color: #262626;
}
</style>

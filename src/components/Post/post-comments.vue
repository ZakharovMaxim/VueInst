<template>
  <div class="post_comments">
    <div class="post_comments-show" @click='show' v-if='over && !expand'>{{`Показать все комментарии (${comments.length})`}}</div>
    <post-comment v-for='(comment, i) in comments' :key='comment._id' :removeCommentOpened='removeCommentOpened' :comment='comment' v-show='!(over && i < (comments.length - toShow))' :post_owner='post_owner' :post_id='post_id' :authorLogin='comment.user_id.login'/>
  </div>
</template>
<script>
import PostComment from './post-comment'
import { removeCommentBus } from '../Buses/Buses.js'
export default {
  name: 'post-comments',
  components: {PostComment},
  created () {
    removeCommentBus.$on('removeCommentOpen', () => {
      this.removeComment = true
    })
  },
  props: {
    comments: {
      type: Array,
      required: true
    },
    post_owner: String,
    post_id: {
      type: String,
      required: true
    }
  },
  methods: {
    show () {
      this.expand = true
    }
  },
  computed: {
    count () {
      return this.comments.length
    },
    over () {
      return this.count > this.default
    },
    toShow () {
      return this.expand ? this.comments.length : this.default
    },
    removeCommentOpened () {
      return this.removeComment
    }
  },
  data () {
    return {
      expand: false,
      default: 3,
      removeComment: false
    }
  }
}
</script>
<style scoped>
.post_comments {
  overflow: auto;
}
.post_comments-show {
  font-size: 12px;
  color: #a8a8a8;
  cursor: pointer;
}
</style>

<template>
  <div class='post_comments'>
    <div class='post_description' v-if='description'>
      <PostComment
        :text='description'
        :user_name='user.name'
        :authorLogin='user.login'
        :postId='postId'
      />
    </div>
    <div class='post_comments-show' @click='show' v-if='over && !expand'>{{`Показать все комментарии (${comments.length})`}}</div>
    <PostComment v-for='(comment, i) in comments' :key='comment._id'
    :id='comment._id'
    :postId='postId'
    :text='comment.text'
    :user_name='comment.user_id.name'
    :authorLogin='comment.user_id.login'
    :showRemoveButton='checkRemoveRights(comment.user_id._id)'
    v-show='showCondition(i)' />
  </div>
</template>
<script>
import PostComment from './PostComment'
import { removeCommentBus } from '@/buses/Buses.js'

export default {
  name: 'PostComments',
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
    user: {
      type: Object,
      required: true
    },
    description: {
      type: String
    },
    currentUserId: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    }
  },
  methods: {
    show () {
      this.expand = true
    },
    showCondition (i) {
      return !(this.over && i < (this.count - this.toShow))
    },
    checkRemoveRights (userId) {
      return this.removeComment && (userId === this.currentUserId || this.currentUserId === this.user._id)
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
.post_description .post_comment {
  margin-bottom: 0;
}
</style>

<template>
    <Post
      :id='post._id'
      :removeRights='removeRights'
      :user='post.user_id'
      :liked='liked'
      :likes='post.likes.length'
      :src='post.src'
      :description='post.description'
      :currentUserId='currentUser.id'
      :comments='post.comments'
      :focusOnNewComment='focusOnNewComment'
      @onLike='onLike'
      @blurCommentInput='blurCommentInput'
      @focusCommentInput='focusCommentInput'
      @activateFullMode='activateFullMode'
      :type='postType'
    />
</template>

<script>
import Post from './Post'
import { mapGetters, mapActions } from 'vuex'
import { LIKE, DISLIKE } from '@/store/modules/types/Post_types'

const types = ['full', 'short', undefined]
export default {
  name: 'post-container',
  data () {
    return {
      focusOnNewComment: false
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    postType: {
      type: String,
      validator: v => ~types.indexOf(v)
    }
  },
  components: { Post },
  computed: {
    ...mapGetters(['currentUser']),
    liked () {
      return !!~this.post.likes.indexOf(this.currentUser.id)
    },
    removeRights () {
      return this.currentUser.id === this.post.user_id._id
    }
  },
  methods: {
    ...mapActions([LIKE, DISLIKE]),
    activateFullMode () {
      this.$emit('click', this.post._id)
    },
    onLike () {
      if (this.liked) {
        this[DISLIKE](this.post._id)
      } else {
        this[LIKE](this.post._id)
      }
    },
    blurCommentInput () {
      this.focusOnNewComment = false
    },
    focusCommentInput () {
      this.focusOnNewComment = true
    }
  }
}
</script>

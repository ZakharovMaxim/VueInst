<template>
    <div class="post" :key="post._id" :class='{"post-user": postType === "user", "post-full": postType === "full"}'>
      <PostTitle :user='post.user_id' v-if='postType === "subs"' :rights='removeRights' :postId="post._id" />
      <PostImage :src="post.src" @like='onLike' :liked='liked' :postType='postType' :postId='post._id' @full='fullMode' :likes='post.likes.length' :comments='post.comments.length'/>
      <PostFooter
        :user='post.user_id'
        :description='post.description'
        :likes='post.likes'
        :date='post.date'
        :comments='post.comments'
        :post_id='post._id'
        :liked='liked'
        :onLike='onLike'
        :postType='postType'
        :rights='removeRights'
        v-if='postType !== "user"'
      />
    </div>
</template>

<script>
import PostFooter from './post-footer'
import PostTitle from './post-title'
import PostImage from './post-image'
import { mapGetters } from 'vuex'
export default {
  name: 'post',
  props: ['post', 'postType'],
  components: {PostTitle, PostFooter, PostImage},
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
    fullMode (startId) {
      this.$emit('full', startId)
    },
    onLike () {
      if (this.liked) {
        this.$store.dispatch('dislike', this.post._id)
      } else {
        this.$store.dispatch('like', this.post._id)
      }
    }
  }
}
</script>

<style scoped>
.post {
  width: 80%;
  background: #fff;
  margin-bottom: 10px;
}
.post-full {
  display: flex;
  flex-wrap: nowrap;
  background: transparent;
  width: auto;
  max-height: 500px;
}
.post-user {
  width: 30%;
  position: relative;
  padding-top: 30%;
}
.post-user:not(:nth-child(3n)) {
  margin-right: 5%;
}
.post-user:hover .likes {
  opacity: 1;
}
</style>

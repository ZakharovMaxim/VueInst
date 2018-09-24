<template>
    <div class="post" :key="post._id" :class='{"post-user": postType === "user", "post-full": postType === "full"}'>
      <PostTitle :user='post.user_id' v-if='postType === "subs"'/>
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
        v-if='postType !== "user"'
      />
    </div>
</template>

<script>
import PostFooter from './PostFooter'
import PostTitle from './PostTitle'
import PostImage from './PostImage'
import { mapGetters } from 'vuex'
export default {
  name: 'Post',
  props: ['post', 'postType'],
  components: {PostTitle, PostFooter, PostImage},
  computed: {
    ...mapGetters(['currentUser']),
    liked () {
      return !!~this.post.likes.indexOf(this.currentUser.id)
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
  height: 500px;
  width: auto;
}
.post-user {
  width: 30%;
  position: relative;
  padding-top: 30%;
}
.post-user:hover .likes {
  opacity: 1;
}
</style>

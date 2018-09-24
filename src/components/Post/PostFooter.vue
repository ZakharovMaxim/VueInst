<template>
    <div class="post_footer">
      <div>
        <PostTitle :user='user' v-if='postType === "full"' />
        <div class="like_post">
          <PostLike :onClick='onLike' :active='liked' />
          <span class='icon-comment' @click='focus'></span>
        </div>
        <div class="post_scroll">
          <PostDescription :description='description' :length='likes.length' :userName='user.name' :userLogin='user.login'/>
         <PostComments v-if='comments.length' :comments='comments' :post_owner='user._id' :post_id='post_id' />
        </div>
        <p class="post_date">{{dateFormated}}</p>
      </div>
      <div>
        <NewComment ref='newComment' :id='post_id'/>
      </div>
    </div>
</template>
<script>
import NewComment from './NewComment'
import PostDescription from './PostDescription'
import PostLike from './PostLike'
import DateFormater from '../../tools/dateFormater'
import PostComments from './PostComments'
import PostTitle from './PostTitle'
export default {
  name: 'PostFooter',
  props: {
    description: String,
    comments: Array,
    likes: Array,
    liked: Boolean,
    date: String,
    postType: String,
    user: Object,
    onLike: Function,
    post_id: {
      type: String,
      required: true
    }
  },
  computed: {
    dateFormated: function () {
      return DateFormater(this.date)
    }
  },
  methods: {
    focus () {
      this.$refs.newComment.focus()
    }
  },
  components: {NewComment, PostLike, PostComments, PostDescription, PostTitle}
}
</script>
 <style scoped>
 .post-full .post_footer {
   height: 100%;
 }
 .post-full .post_scroll {
   max-height: 250px;
   overflow: auto;
 }
.post_footer {
  padding: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.like_post {
  display: flex;
  align-items: center;
}
.view_more {
  color: black;
  font-size: 16px;
}
.post_date {
  color: grey;
  font-weight: lighter;
  font-size: 10px;
  text-transform: uppercase;
}
</style>

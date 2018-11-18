<template>
    <div class="post_footer">
      <div>
        <post-title :user='user' v-if='postType === "full"' :rights='rights' :postId='post_id'/>
        <div class="like_post">
          <post-like :onClick='onLike' :active='liked' />
          <span class='icon-comment' @click='focus'></span>
        </div>
        <div class="post_scroll">
          <post-description :description='description' :length='likes.length' :userName='user.name' :userLogin='user.login'/>
         <post-comments v-if='comments.length' :comments='comments' :post_owner='user._id' :post_id='post_id' />
        </div>
        <p class="post_date">{{dateFormated}}</p>
      </div>
      <div>
        <new-comment ref='newComment' :id='post_id'/>
      </div>
    </div>
</template>
<script>
import NewComment from './new-comment'
import PostDescription from './post-description'
import PostLike from './post-like'
import DateFormater from '../../tools/dateFormater'
import PostComments from './post-comments'
import PostTitle from './post-title'
export default {
  name: 'post-footer',
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
    },
    rights: Boolean
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

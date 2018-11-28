<template>
    <div class='post-short' v-if='type === "short"' @click='activateFullMode'>
      <PostImage :src='src' @like='onLike' :liked='liked' :postId='id' />
      <PostShortStats :likes='likes' :comments='comments.length' />
    </div>
    <div class='post-full' v-else-if='type === "full"'>
      <div class='mobile'>
        <PostHeader :user='user' :rights='removeRights' :postId='id' />
      </div>
      <PostImage :src='src' @like='onLike' :liked='liked' :postId='id' />
      <div class='desktop'>
        <div class='post-full__description'>
          <div class='post-full__text'>
            <PostHeader :user='user' :rights='removeRights' :postId='id' />
            <div class='post-full__overflow'>
              <PostCommentList :user='user' :description='description' :comments='comments' :currentUserId='currentUserId' :postId='id'/>
            </div>
            <PostStatsContainer :liked='liked' :likes='likes' @focus='focusCommentInput' @onLike='onLike' />
          </div>
          <div class='post-full__new-comment'>
            <PostNewCommentContainer :id='id' @blur='blurCommentInput' />
          </div>
        </div>
      </div>
      <div class='mobile'>
        <div class='post__content'>
          <PostStatsContainer :liked='liked' :likes='likes' @focus='focusCommentInput' @onLike='onLike' />
          <PostCommentList :user='user' :description='description' :comments='comments' :currentUserId='currentUserId' :postId='id'/>
        </div>
        <PostNewCommentContainer :id='id' @blur='blurCommentInput' />
      </div>
    </div>
    <div class='post' v-else>
      <PostHeader :user='user' :rights='removeRights' :postId='id' />
      <PostImage :src='src' @like='onLike' :liked='liked' :postId='id' />
      <div class='post__content'>
        <PostStatsContainer :liked='liked' :likes='likes' @focus='focusCommentInput' @onLike='onLike' />
        <PostCommentList :user='user' :description='description' :comments='comments' :currentUserId='currentUserId' :postId='id'/>
      </div>
      <PostNewCommentContainer :id='id' @blur='blurCommentInput' :focusOnNewComment='focusOnNewComment' />
    </div>
</template>

<script>
import PostNewCommentContainer from './PostNewCommentContainer'
import PostStatsContainer from './PostStatsContainer'
import PostShortStats from './PostShortStats'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostCommentList from './PostCommentList'

export default {
  name: 'Post',
  components: { PostHeader, PostStatsContainer, PostImage, PostCommentList, PostNewCommentContainer, PostShortStats },
  props: {
    id: {
      type: String,
      required: true
    },
    removeRights: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    liked: {
      type: Boolean,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    src: {
      type: String
    },
    description: {
      type: String
    },
    currentUserId: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    focusOnNewComment: Boolean,
    type: String
  },
  methods: {
    onLike () {
      this.$emit('onLike')
    },
    blurCommentInput () {
      this.$emit('blurCommentInput')
    },
    focusCommentInput () {
      this.$emit('focusCommentInput')
    },
    activateFullMode () {
      this.$emit('activateFullMode')
    }
  }
}
</script>

<style>
.post {
  width: 80%;
  background: #fff;
  margin-bottom: 10px;
}
.post .post_img img {
  width: 100%;
}
.post-short {
  width: 28%;
  position: relative;
  cursor: pointer;
  margin-bottom: 5%;
}
.post-short:hover .post-short-stats {
  display: flex;
  align-items: center;
  justify-content: center;
}
.post-short:not(:last-child) {
  margin-right: 5.3333%;
}
.post-short .post_img {
  padding-top: 100%;
  overflow: hidden;
}
.post-short .post_img img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
}
.post-full {
  display: flex;
  flex-wrap: nowrap;
  background: transparent;
  max-height: 500px;
  height: auto;
  max-width: 80%;
  justify-content: center;
}
.post-full .post_img {
  background: #000;
  display: flex;
  align-items: center;
}
.post-full .post_img img {
  width: auto;
  max-height: 100%;
  max-width: 100%;
}
.post-full__description {
  background: #fff;
  width: 300px;
  height: 100%;
}
.post-full__text {
  height: 80%;
  padding: 0 20px;
}
.post-full__new-comment {
  height: 20%;
  display: flex;
  align-items: flex-end;
}
.post-full__overflow {
  overflow: auto;
  max-height: 280px;
}
.post__content {
  padding: 10px 20px;
}
.mobile {
  display: none;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 860px) {
  .post-full {
    flex-direction: column;
    background: #fff;
    max-height: unset;
  }
  .post-full .post_img {
    display: block;
    background: transparent;
  }
  .mobile {
    display: block;
  }
  .desktop {
    display: none;
  }
}
</style>

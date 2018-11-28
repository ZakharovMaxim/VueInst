<template>
    <div class='post_title'>
      <div class='post_title__user'>
        <a :href='"/" + user.login'>
        <UserAvatar :src='user.poster && user.poster.src' :alt='user.name' :width='50' :height='50' />
        </a>
        <a :href='"/" + user.login'>{{user.name}}</a>
      </div>
      <PostControllsContainer :rights='rights' :postId='postId' />
    </div>
</template>
<script>
import PostControllsContainer from './PostControllsContainer'
import UserAvatar from '../Layout/UserAvatar'

export default {
  name: 'PostHeader',
  props: {
    user: {
      type: Object,
      required: true
    },
    rights: {
      type: Boolean,
      default: false
    },
    postId: {
      type: String,
      required: true
    }
  },
  components: { PostControllsContainer, UserAvatar }
}
</script>

 <style scoped>
 .post_title {
   padding: 10px 25px 10px 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .post_title__user {
   display: flex;
   align-items: center;
 }
.post_title__user a:first-child {
  margin-right: 10px;
}
.post_title a {
  font-weight: bold;
  font-size: 13px;
  color: #000;
  text-decoration: none;
}
</style>

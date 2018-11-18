<template>
    <div class="post_title">
      <div class='post_title__user'>
        <a :href='"/" + user.login'><img :src="(user.poster && user.poster.src ) || $settings['default-avatar']" :alt="user.name"></a>
        <a :href='"/" + user.login'>{{user.name}}</a>
      </div>
      <post-controlls-container :rights='rights' :postId='postId' />
    </div>
</template>
<script>
import postControllsContainer from './post-controlls-container'
export default {
  name: 'post-title',
  props: ['user', 'rights', 'postId'],
  components: {postControllsContainer}
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
.post_title img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.post_title a {
  font-weight: bold;
  font-size: 13px;
  color: #000;
  text-decoration: none;
}
</style>

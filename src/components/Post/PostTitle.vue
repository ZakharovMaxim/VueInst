<template>
    <div class="post_title">
        <a :href='"/" + user.login'><img :src="(user.poster && user.poster.src ) || $settings['default-avatar']" :alt="user.name"></a>
        <a :href='"/" + user.login'>{{user.name}}</a>
      </div>
</template>
<script>
export default {
  name: 'PostTitle',
  props: ['user'],
  created () {
    console.log(this)
  }
}
</script>
 <style scoped>
 .post_title {
   margin: 10px 0 10px 5px;
 }
.post_title img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.post_title {
  display: flex;
  align-items: center;
}
.post_title a {
  font-weight: bold;
  font-size: 13px;
  color: #000;
  text-decoration: none;
}
</style>

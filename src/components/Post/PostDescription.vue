<template>
  <div class="post_description">
      <p class="post_likes">{{length}} отметок "Нравится"</p>
      <a :href="'/' + userLogin"><span class="post_comment-name">{{userName}}</span></a>
      <span>{{description}}</span>
    </div>
</template>
<script>
export default {
  name: 'PostDescription',
  props: {
    description: {
      type: String
    },
    length: {
      type: Number,
      default: 0
    },
    userName: {
      type: String,
      required: true
    },
    userLogin: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.post_likes {
  margin-bottom: 5px;
}
.post_likes {
  font-weight: bold;
  font-size: 13px;
  color: #262626;
}
.post_description {
  font-size: 14px;
}
.post_description a {
  color: #292929;
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
}
</style>

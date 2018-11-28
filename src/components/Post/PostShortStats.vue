<template>
  <div class='post-short-stats'>
    <div class='post-short-stats__liked'>
      <span class='icon-like'></span>
      <span>{{likes}}</span>
    </div>
    <div class='post-short-stats__comments'>
      <span class='icon-comment'></span>
      <span>{{comments}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostShortStats',
  props: {
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.post-short-stats {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
}
.post-short-stats {
  color: #fff;
  font-weight: bold;
  font-size: 10px;
}
.post-short-stats__liked {
  position: relative;
  padding-right: 10px;
  margin-right: 10px;
}
.post-short-stats__liked:after {
  content: '';
  height: 100%;
  width: 1px;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
}
</style>

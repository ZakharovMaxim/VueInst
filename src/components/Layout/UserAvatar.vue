<template>
  <div class='user-avatar' :style='{"width": width + "px", "height": height + "px"}' @click='$emit("click")'>
    <img :src='src || $settings["default-avatar"]' :alt='alt'>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    src: {
      type: String
    },
    alt: {
      type: String
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style scoped>
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.user-avatar img {
  width: 100%;
  min-height: 100%;
}
</style>

<template>
  <div class='error'>
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'TheError',
  props: {
    text: {
      type: String,
      default: 'Error'
    }
  }
}
</script>

<style scoped>
.error {
  text-align: center;
  color: red;
  font-size: 28px;
}
</style>

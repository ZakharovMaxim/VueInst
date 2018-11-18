<template>
  <div class="error">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    text: {
      type: String,
      default: 'Error'
    }
  }
}
</script>

<style>
  .error {
    text-align: center;
    color: red;
    font-size: 28px;
  }
</style>

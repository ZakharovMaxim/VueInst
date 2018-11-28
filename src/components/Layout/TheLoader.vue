<template>
  <div class="loading">
    <BaseLogo :main='true' :fixed='true' />
  </div>
</template>

<script>
import BaseLogo from '../Layout/BaseLogo'
export default {
  name: 'TheLoader',
  components: { BaseLogo }
}
</script>

<style scoped>
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>

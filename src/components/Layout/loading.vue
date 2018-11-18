<template>
  <div class="loading">
    <Logo :main='true' :fixed='true' />
  </div>
</template>

<script>
import Logo from '../Layout/logo'
export default {
  name: 'loading',
  components: {Logo}
}
</script>

<style>
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

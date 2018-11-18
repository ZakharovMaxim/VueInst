<template>
  <div class="main">
    <main-form />
  </div>
</template>
<script>
import MainForm from '../components/Forms/main-form'
export default {
  name: 'login-page',
  components: {MainForm}
}
</script>
<style scoped>
  .main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../assets/img/bg.jpg') 100% 100% no-repeat;
  }
</style>

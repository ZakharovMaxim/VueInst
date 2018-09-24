<template>
  <div class="main">
    <MainForm></MainForm>
  </div>
</template>
<script>
import MainForm from '../components/MainForm'
export default {
  name: 'LoginPage',
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

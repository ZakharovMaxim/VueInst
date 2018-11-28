<template>
  <div class='main'>
    <FormAuth />
  </div>
</template>
<script>
import FormAuth from '@/components/Forms/FormAuth'
export default {
  name: 'LoginPage',
  components: { FormAuth }
}
</script>
<style scoped>
  .main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/@/assets/img/bg.jpg') 100% 100% no-repeat;
  }
</style>

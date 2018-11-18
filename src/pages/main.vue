<template>
      <div v-if='isAuth'>
        <main-page-content />
      </div>
      <div v-else class='w100'>
        <login-page />
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoginPage from './login'
import MainPageContent from '../components/Layout/main-page-content'
import Content from '../components/Layout/content-vue'
export default {
  name: 'main-page',
  computed: {
    ...mapGetters(['isAuth'])
  },
  components: {LoginPage, MainPageContent, Content}
}
</script>
<style>
  .main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .align-content {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
  }
  .registration .align-content {
    align-items: center;
  }
</style>

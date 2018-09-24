<template>
      <Content v-if='isAuth'>
        <MainPageContent />
      </Content>
      <div v-else class='w100'>
        <LoginPage />
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoginPage from './login'
import MainPageContent from '../components/MainPageContent'
export default {
  name: 'contentVue',
  computed: {
    ...mapGetters(['isAuth'])
  },
  components: {LoginPage, MainPageContent}
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

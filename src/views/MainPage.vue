<template>
      <div v-if='isAuth' v-title='"VueInst"'>
        <TheMainPageContent />
      </div>
      <div v-else class='w100' v-title='"Авторизация"'>
        <LoginPage />
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoginPage from './LoginPage'
import TheMainPageContent from '@/components/Layout/TheMainPageContent'
import TheContent from '@/components/Layout/TheContent'
export default {
  name: 'MainPage',
  computed: {
    ...mapGetters(['isAuth'])
  },
  components: { LoginPage, TheMainPageContent, TheContent }
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

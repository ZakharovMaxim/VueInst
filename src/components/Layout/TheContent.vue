<template>
  <div class='main'>
    <div class='align-content'>
      <div class='w100'>
        <TheHeader />
        <div class='content'>
          <slot />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
export default {
  name: 'TheContent',
  computed: {
    ...mapGetters(['isAuth'])
  },
  components: { TheHeader, TheFooter }
}
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main.registration {
  background: url('../../assets/img/bg.jpg') 100% 100% no-repeat;
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

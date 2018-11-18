<template>
  <div class='main'>
    <div class='align-content'>
      <div class='w100'>
        <HeaderVue />
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
    <footerVue></footerVue>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HeaderVue from './header-vue'
import FooterVue from './footer'
export default {
  name: 'content-vue',
  computed: {
    ...mapGetters(['isAuth'])
  },
  components: {HeaderVue, FooterVue}
}
</script>
<style>
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

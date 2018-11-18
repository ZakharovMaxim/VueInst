<template>
  <change-info-form :user='user' />
</template>

<script>
import secondaryBtn from '../Controlls/secondary-button'
import changeInfoForm from './change-info-form'
export default {
  name: 'change-user',
  components: {secondaryBtn, changeInfoForm},
  methods: {
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      changeAvatar: false,
      src: (this.user.poster && this.user.poster.src) || this.$settings['default-avatar']
    }
  }
}
</script>

<style scoped>

</style>

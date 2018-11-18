<template>
  <div class='profileForm'>
    <input-vue :value='oldPassword' @input="handleOld"  :label='"Cтарый пароль"' :name='"password-old"'/>
    <input-vue :value='newPassword' @input="handleNew" :label='"Новый пароль"' :name='"password-new"'/>
    <input-vue :value='newPasswordConfirm' @input="handleConfirm" :label='"Подтвердить новый пароль"' :name='"password-confirm"'/>
    <span class="error" v-if='err'>{{err}}</span>
    <secondary-btn :text='"Изменить"' @click='submit' />
  </div>
</template>
<script>
import inputVue from '../Controlls/input-vue'
import secondaryBtn from '../Controlls/secondary-button'
export default {
  name: 'change-password-form',
  methods: {
    handleOld (e) {
      this.err = ''
      this.oldPassword = e.target.value
    },
    handleNew (e) {
      this.err = ''
      this.newPassword = e.target.value
    },
    handleConfirm (e) {
      this.err = ''
      this.newPasswordConfirm = e.target.value
    },
    submit () {
      if (!this.newPassword || !this.newPasswordConfirm || !this.oldPassword) {
        this.err = 'Не заполнили поля'
        return
      }
      if (this.newPassword !== this.newPasswordConfirm) {
        this.err = 'Пароли не совпадают'
        return
      }
      this.$store.dispatch('changePassword', {
        password: this.oldPassword,
        newPassword: this.newPassword
      }).then(() => {
        this.oldPassword = ''
        this.newPassword = ''
        this.newPasswordConfirm = ''
        this.err = ''
        this.$sticky.add({
          text: 'Пароль успешно изменен'
        })
      }).catch(e => {
        this.err = e.response.data.message
      })
    }
  },
  data () {
    return {
      err: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  },
  components: {inputVue, secondaryBtn}
}
</script>
<style scoped>
.profileForm {
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: flex-start;
}
</style>

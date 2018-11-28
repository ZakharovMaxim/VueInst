<template>
  <div class='profileForm'>
    <BaseInput :value='oldPassword' @input='handleOld' label='Cтарый пароль' name='password-old'/>
    <BaseInput :value='newPassword' @input='handleNew' label='Новый пароль' name='password-new'/>
    <BaseInput :value='newPasswordConfirm' @input='handleConfirm' label='Подтвердить новый пароль' name='password-confirm'/>
    <span class='error' v-if='err'>{{err}}</span>
    <ButtonSecondary text='Изменить' @click='submit' />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import BaseInput from '../Controlls/BaseInput'
import ButtonSecondary from '../Controlls/ButtonSecondary'
import { CHANGE_PASSWORD } from '../../store/modules/types/User_types'
export default {
  name: 'ChangeInfoPasswordForm',
  methods: {
    ...mapActions([CHANGE_PASSWORD]),
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
      this[CHANGE_PASSWORD]({
        password: this.oldPassword,
        newPassword: this.newPassword
      }).then(() => {
        this.oldPassword = ''
        this.newPassword = ''
        this.newPasswordConfirm = ''
        this.err = ''
        this.$VueInst_Snackbar.add({
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
  components: { BaseInput, ButtonSecondary }
}
</script>
<style scoped>
.error {
  color: crimson;
  text-align: center;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  display: inline-block;
}
</style>

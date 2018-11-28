<template>
   <div>
    <ChangeInfoHeader :user='user' />
    <div class='profileForm'>
      <BaseInput :value='form.name' @input='handleName'  label='Имя' name='name' :error='form.errors.get("name")' />
      <BaseInput :value='form.description' @input='handleDescription' :area='true' label='О себе' name='description' :error='form.errors.get("description")' />
      <BaseInput :value='form.mail' @input='handleMail' label='Эл. почта' name='mail' :error='form.errors.get("mail")' />
      <BaseInput :value='form.login' @input='handleLogin' label='Эл. почта' name='login' :error='form.errors.get("login")' />
      <ButtonSecondary text='Изменить' @click='submit' />
    </div>
   </div>
</template>
<script>
// import Vue from 'vue'
import { mapActions } from 'vuex'
import BaseInput from '../Controlls/BaseInput'
import ButtonSecondary from '../Controlls/ButtonSecondary'
import Form from '@/classes/Form'
import ChangeInfoHeader from './ChangeInfoHeader'
import { CHANGE_INFO } from '@/store/modules/types/User_types'
export default {
  name: 'ChangeInfoMainForm',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([CHANGE_INFO]),
    handleName (e) {
      this.form.name = e.target.value
      this.form.errors.remove('name')
    },
    handleMail (e) {
      this.form.mail = e.target.value
      this.form.errors.remove('mail')
    },
    handleDescription (e) {
      this.form.description = e.target.value
      this.form.errors.remove('description')
    },
    handleLogin (e) {
      this.form.login = e.target.value
      this.form.errors.remove('login')
    },
    submit () {
      this.form.submit('post', '/user/changeInfo', true).then(data => {
        if (!data) return
        return this[CHANGE_INFO]({
          token: data.data.token,
          user: this.form.data()
        })
      }).then(response => {
        if (response) {
          this.$VueInst_Snackbar.add({
            text: 'Информация успешно изменена'
          })
        } else {
          this.$VueInst_Snackbar.add({
            text: 'Данные не изменились',
            type: 'warning'
          })
        }
      }).catch(e => {
        this.form.errors.add(e.response.data)
      })
    }
  },
  data () {
    return {
      form: new Form({
        name: this.user.name,
        description: this.user.description || '',
        mail: this.user.mail,
        login: this.user.login
      })
    }
  },
  components: { BaseInput, ButtonSecondary, ChangeInfoHeader }
}
</script>
<style>
.profileForm {
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: flex-start;
}
@media screen and (max-width: 650px) {
  .profileForm {
    width: 100%;
  }
}
</style>

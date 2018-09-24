<template>
   <div>
    <change-user-header :user='user' />
  <div class='profileForm'>
    <input-vue :value='form.name' @input="handleName"  :label='"Имя"' :name='"name"' :error='form.errors.get("name")' />
    <input-vue :value='form.description' @input="handleDescription" :area='true' :label='"О себе"' :name='"description"' :error='form.errors.get("description")' />
    <input-vue :value='form.mail' @input="handleMail" :label='"Эл. почта"' :name='"mail"' :error='form.errors.get("mail")'/>
    <input-vue :value='form.login' @input="handleLogin" :label='"Эл. почта"' :name='"login"' :error='form.errors.get("login")'/>
    <secondary-btn :text='"Изменить"' @click='submit'/>
  </div>
   </div>
</template>
<script>
import inputVue from './input-vue'
import secondaryBtn from './Buttons/secondary-button'
import Form from '../classes/Form'
import changeUserHeader from './change-user-header'
export default {
  name: 'change-info-form',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
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
      this.form.submit('post', 'http://localhost:3000/user/changeInfo', true).then(data => {
        if (!data) return console.log('no changes')
        this.$store.dispatch('changeInfo', {
          token: data.data.token,
          user: this.form.data()
        })
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
  components: {inputVue, secondaryBtn, changeUserHeader}
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

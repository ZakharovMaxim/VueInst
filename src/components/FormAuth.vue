<template>
  <div>
    <form class="registry_form" @submit.prevent="submit">
      <Logo></Logo>
      <div class="look_and_public">
        <h4>Смотри </h4>
        <h4 class="with_psevdo">Снимай</h4>
        <h4>Публикуй </h4>
      </div>
      <h3>Входи</h3>
      <div class="form_group"><input placeholder="Имя пользователя" type="text" @keydown="form.errors.remove('login', 'data')" v-model='form.login'><span class="err" v-if="form.errors.has('login')">{{ form.errors.get('login')}}</span></div>
      <div class="form_group"><input placeholder="Пароль" type="text" @keydown="form.errors.remove('password', 'data')" v-model='form.password'><span class="err" v-if="form.errors.has('password')">{{ form.errors.get('password')}}</span></div>
      <div class="form-group" v-if="form.errors.has('data')"><span class="err">{{ form.errors.get('data') }}</span></div>
      <input value="Вход" type="submit">
    </form>
    <div class="have_acc">
      <a href="#" @click.prevent="$emit('changeForm', false)">Регистрация</a>
    </div>
  </div>
</template>
<script>
import Logo from './Logo'

import Form from '../classes/Form.js'
export default {
  name: '',
  data () {
    return {
      login: false,
      form: new Form({
        login: '',
        password: ''
      })
    }
  },
  components: {Logo},
  methods: {
    submit (e) {
      this.form.submit('post', 'http://localhost:3000/login').then(response => {
        console.log(response)
        this.form.reset()
        this.$store.dispatch('setToken', response.data)
      }).catch(e => {
        this.form.errors.add(e.response.data)
      })
    }
  }
}
</script>
<style>
</style>
@click="$emit('login', true)

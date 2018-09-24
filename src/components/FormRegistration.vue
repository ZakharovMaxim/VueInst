<template>
  <div>
    <form class="registry_form" @submit.prevent="submit">
      <Logo></Logo>
      <div class="look_and_public">
        <h4>Смотри </h4>
        <h4 class="with_psevdo">Снимай</h4>
        <h4>Публикуй </h4>
      </div>
      <h3>Зарегистрируйся</h3>
      <div class="form_group"><input placeholder="Электронный адрес" type="text" @keydown="form.errors.remove('mail')" v-model='form.mail'><span class="err" v-if="form.errors.has('mail')">{{ form.errors.get('mail')}}</span></div>
      <div class="form_group"><input placeholder="Имя и Фамилия" type="text" @keydown="form.errors.remove('name')" v-model='form.name' ><span class="err" v-if="form.errors.has('name')">{{ form.errors.get('name')}}</span></div>
      <div class="form_group"><input placeholder="Имя пользователя" type="text" @keydown="form.errors.remove('login')" v-model='form.login'><span class="err" v-if="form.errors.has('login')">{{ form.errors.get('login')}}</span></div>
      <div class="form_group"><input placeholder="Пароль" type="text" @keydown="form.errors.remove('password')" v-model='form.password'><span class="err" v-if="form.errors.has('password')">{{ form.errors.get('password')}}</span></div>
      <input value="Регистрация" type="submit">
    </form>
    <div class="have_acc">
      <span>Есть аккаунт?</span>
      <a href="#" @click.prevent="$emit('changeForm', true)">Вход</a>
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
      form: new Form({
        mail: '',
        name: '',
        login: '',
        password: ''
      })
    }
  },
  components: {Logo},
  methods: {
    submit (e) {
      this.form.submit('post', 'http://localhost:3000/registration').then(response => {
        this.form.reset()
        this.$emit('changeForm', true)
      }).catch(e => {
        this.form.errors.add(e.response.data)
      })
    }
  }
}
</script>
<style>
</style>

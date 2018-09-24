<template>
  <div class="form-content">
    <FormAuth v-if='login' @changeForm='changeForm'></FormAuth>
    <FormRegistration v-else @changeForm='changeForm'></FormRegistration>
  </div>
</template>
<script>
import Form from '../classes/Form.js'
import FormRegistration from './FormRegistration'
import FormAuth from './FormAuth'
export default {
  name: '',
  data () {
    return {
      login: false,
      form: new Form({
        mail: '',
        name: '',
        login: '',
        password: ''
      })
    }
  },
  components: {FormAuth, FormRegistration},
  methods: {
    changeForm (login) {
      if (login) this.login = true
      else this.login = false
    }
  }
}
</script>
<style>
form {
  width: fit-content;
  padding: 30px;
  background: #fff;
}
h3 {
  font-family: 'Pangolin', cursive;
  margin-top:20px;
  margin-bottom: 20px;
  color: #454444;
  font-size: 24px;
}
.registry_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.look_and_public {
  display: flex;
}
.look_and_public h4 {
  font-family: 'Pangolin', cursive;
  color: #828282;
  font-size: 18px;
  font-weight: lighter;
}
.with_psevdo {
  position: relative;
  margin-left: 50px;
  margin-right: 50px;
}
.with_psevdo:before,
.with_psevdo:after {
  position: absolute;
  content: '';
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  width: 30px;
  height: 2px;
  background: #828282;
}
.with_psevdo:before {
  margin-top: -1px;
  top:50%;
  left: -40px;
}
.with_psevdo:after {
  margin-top: -1px;
  top:50%;
  right: -40px;
}

.form_group {
  width: 100%;
  margin-bottom: 15px;
}
.form_group:last-child {
  margin-bottom: 0;
}
.form_group input {
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;

  background-color: #F5F5F5;
  outline: none;
  border: 1px solid #CCCACA;
  border-radius: 4px;
  color: #CCCACA;
  font-weight: bold;
  letter-spacing: 5%;
}

.registry_form input[type="submit"] {
  border: none;
  outline: none;
  background-color: #219653;
  color:#fff;
  font-weight: bold;
  font-size: 14px;
  padding: 12px 30px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
}
.form-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.have_acc {
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.have_acc span {
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px;
  color:#333333;
}
.have_acc a{
  text-decoration: none;
  color: #2D9CDB;
  font-weight: bold;
  font-size: 14px;
}
.err {
  font-size: 12px;
  color: crimson;
}
</style>

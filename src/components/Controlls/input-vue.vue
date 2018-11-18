<template>
  <div class='form__wrapper'>
    <div class="form__input">
    <div class="form__input-label" v-if='label'>
      <label :for='"input_" +name'>{{label}}</label>
    </div>
    <div class="form__input-input">
      <input :type="type" @input='input' :value='value' v-if='!area' :id='"input_" + name' />
      <textarea v-else @input='input' :value='value' :id='"input_" +name'></textarea>
    </div>
  </div>
  <div class="error" v-if='error'>
    {{error}}
  </div>
  </div>
</template>
<script>
export default {
  name: 'input-vue',
  props: {
    error: {
      type: String
    },
    type: {
      type: String,
      default () {
        return 'text'
      }
    },
    value: {
      type: String,
      default () {
        return ''
      }
    },
    area: {
      type: Boolean,
      default () {
        return false
      }
    },
    label: String,
    name: String
  },
  methods: {
    input (e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style scoped>
.form__wrapper {
  width: 100%;
  margin-bottom: 25px;
}
.form__input {
  display: flex;
  width: 100%;
}
.error {
  color: #ed143d;
  margin-left: 42%;
}
.form__input-label {
  flex: 3;
  text-align: right;
  margin-right: 30px;
  font-weight: bold;
  padding-top: 5px;
}
.form__input-input {
  flex: 5;
}
input, textarea {
  border: 1px solid #D1D1D1;
  border-radius: 3px;
  background: transparent;
  width: 100%;
  padding: 7px 5px;
  outline: none;
  font-family: inherit;
  font-size: 14px;
}
textarea {
  resize: none;
  height: 100px;
}
</style>

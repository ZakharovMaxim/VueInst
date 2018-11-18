<template>
  <div class="confirm-window" @click='close'>
    <div class="confirm-form">
      <span class="icon-cross-out confirm-form_close" @click='fail'></span>
      <div class="confirm-form__title">{{title || defaultTitle}}</div>
      <primary-btn :text='btnSuccessText || defaultBtnSuccessText' @click='success' />
      <secondary-btn :text='btnFailText || defaultBtnFailText' @click='fail' />
    </div>
  </div>
</template>
<script>
import primaryBtn from '../Controlls/primary-button'
import secondaryBtn from '../Controlls/secondary-button'
export default {
  name: 'ConfirmForm',
  data () {
    return {
      defaultTitle: 'Подтвердите действие',
      defaultBtnSuccessText: 'ОК',
      defaultBtnFailText: 'Нет'
    }
  },
  props: ['btnFailText', 'btnSuccessText', 'title'],
  methods: {
    success () {
      this.$emit('success')
    },
    fail () {
      this.$emit('fail')
    },
    close (e) {
      if (e.target === this.$el) this.fail()
    }
  },
  components: {primaryBtn, secondaryBtn}
}
</script>

<style scoped>
.confirm-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, .3);
}
.confirm-form {
  background: #fff;
  padding: 20px;
  position: relative;
}
.confirm-form_close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 10px;
}
.confirm-form__title {
  text-align: center;
}
</style>

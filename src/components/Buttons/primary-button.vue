<template>
  <button :class='{small: size === "small"}' @click='click'>{{text}}</button>
</template>
<script>
export default {
  name: 'primary-button',
  props: {
    text: {
      type: String,
      default: 'Button'
    },
    size: String
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
  button {
    padding: 7px 25px;
    border: 1px solid #050505;
    border-radius: 4px;
    background: #fafafa;
    color: #000;
    font-size: 13px;
    font-weight: bold;
  }
  button.small {
    padding: 5px 9px;
  }
</style>

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
    padding: 9px 27px;
    border: none;
    border-radius: 4px;
    background: #3897F0;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
  }
  button.small {
    padding: 5px 9px;
  }
</style>

<template>
  <button :class='{small: size === "small"}' @click='click'>{{text}}</button>
</template>
<script>
export default {
  name: 'ButtonSecondary',
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
    padding: 7px 27px;
    border: 1px solid #3897F0;
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

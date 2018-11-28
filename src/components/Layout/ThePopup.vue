<template>
  <div class='popup' @click.self='close'>
    <div class='popup__form'>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePopup',
  methods: {
    close (e) {
      this.$emit('close')
    }
  }
}
</script>

<style>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: rgba(0,0,0,.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup__form {
    width: 400px;
    position: relative;
    background: #fff;
    border-radius: 5px 0;
  }
  .popup__form li {
    padding: 8px;
    list-style: none;
    cursor: pointer;
    text-align: center;
  }
  .popup__form li:focus, .popup__form li:active {
    outline: auto 5px -webkit-focus-ring-color;
  }
  .popup__form li.danger {
    color: #d32f2f;
  }
</style>

<template>
  <div class="fake-user">
    <div class="fake-header">
      <div class="fake-header__img"></div>
      <div class="fake-header__info">
        <div class="fake-header__name"></div>
        <div class="fake-header__actions"></div>
        <div class="fake-header__stats"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading-user'
}
</script>

<style>
  .fake-header {
    display: flex;
    align-items: stretch;
  }
  .fake-header div {
    background: #555;
  }
  .fake-header__img {
    margin-right: 25px;
    width: 20%;
    padding-top: 20%;
    border-radius: 50%;
  }
  .fake-header__info > div:not(:last-child) {
    margin-bottom: 10px;
  }
</style>

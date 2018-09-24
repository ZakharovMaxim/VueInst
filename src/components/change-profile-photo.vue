<template>
    <div class="change-avatar" @click='close'>
    <div class="change-avatar__form">
      <span class="close icon-cross-out" @click='fail'></span>
      <ul>
        <label for="avatar"><li>Добавить аватар</li></label>
        <li class='dangerous' @click='remove'>Удалить аватар</li>
        <li @click='fail'>Выйти</li>
        <input type="file" id='avatar' @change='load'>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'change-profile-photo',

  methods: {
    remove () {
      this.$store.dispatch('removeAvatar').then(() => {
        this.$emit('close')
      })
    },
    close (e) {
      if (e.target === e.currentTarget) this.fail()
    },
    fail (e) {
      this.$emit('close')
    },
    load (e) {
      const file = e.target.files // FileList object
      const f = file[0]
      if (!f.type.match('image.*')) {
        return
      }
      const data = new FormData()
      data.append('image', f)
      this.$store.dispatch('changeAvatar', data)
    }
  }
}
</script>
<style scoped>
.change-avatar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-avatar__form {
  width: 400px;
  position: relative;
  background: #fff;
  border-radius: 5px 0;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.change-avatar__form li {
  padding: 15px;
  list-style: none;
  cursor: pointer;
}
label {
  cursor: pointer;
}
.dangerous {
  color: red;
}
input {
  display: none;
}
</style>

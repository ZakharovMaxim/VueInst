<template>
  <popup @close='close'>
    <span class="close icon-cross-out" @click='fail'></span>
    <ul>
      <label for="avatar"><li>Добавить аватар</li></label>
      <li class='dangerous' @click='remove'>Удалить аватар</li>
      <li @click='fail'>Выйти</li>
      <input type="file" id='avatar' @change='load'>
    </ul>
  </popup>
</template>

<script>
import popup from '../Popup/popup'
export default {
  name: 'change-profile-photo',

  methods: {
    remove () {
      this.$store.dispatch('removeAvatar').then(() => {
        this.$emit('close')
      })
    },
    close (e) {
      this.fail()
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
  },
  components: {popup}
}
</script>
<style scoped>
.close {
  position: absolute;
  top: 5px;
  right: 5px;
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

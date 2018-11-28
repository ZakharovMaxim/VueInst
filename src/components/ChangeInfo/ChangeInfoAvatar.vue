<template>
  <ThePopup @close='close'>
    <span class='close icon-cross-out' @click='fail'></span>
    <ul>
      <label for='avatar'><li>Добавить аватар</li></label>
      <li class='dangerous' @click='remove'>Удалить аватар</li>
      <li @click='fail'>Выйти</li>
      <input type='file' id='avatar' @change='load'>
    </ul>
  </ThePopup>
</template>

<script>
import { mapActions } from 'vuex'
import ThePopup from '../Layout/ThePopup'
import { REMOVE_AVATAR, CHANGE_AVATAR } from '@/store/modules/types/User_types'
export default {
  name: 'ChangeInfoAvatar',
  methods: {
    ...mapActions([REMOVE_AVATAR, CHANGE_AVATAR]),
    remove () {
      this[REMOVE_AVATAR]().then(() => {
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
      this[CHANGE_AVATAR](data)
    }
  },
  components: { ThePopup }
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

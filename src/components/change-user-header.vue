<template>
<div>
  <change-profile-photo v-show='openedForm' @close='close'/>
   <div class="profileChange">
      <div class="profileChange__poster">
        <label for="avatar" v-if='noAvatar'>
          <img :src="src" alt="" />
        </label>
        <img :src="src" alt="" v-else @click='open'/>
      </div>
      <div class="profileChange__text">
        <div class="profileChange__name">{{user.name}}</div>
        <div class="profileChange__action">
          <span @click='open'>Изменить фото профиля</span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import changeProfilePhoto from './change-profile-photo'
export default {
  name: 'change-user-header',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    open () {
      this.openedForm = true
    },
    close () {
      this.openedForm = false
    }
  },
  data () {
    return {
      openedForm: false
    }
  },
  computed: {
    src () {
      return (this.user.poster) || this.$settings['default-avatar']
    },
    noAvatar () {
      return !this.user.poster
    }
  },
  components: {changeProfilePhoto}
}
</script>

<style scoped>
.profileChange {
  display: flex;
}
.profileChange__poster {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.profileChange__poster img {
  width: 100%;
  min-height: 100%;
}
.profileChange__name {
  font-weight: bold;
  font-size: 20px;
}
.profileChange__action {
  color: #3897F0;
  font-size: 13px;
  font-weight: bold;
}
</style>

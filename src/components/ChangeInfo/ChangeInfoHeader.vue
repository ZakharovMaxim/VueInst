<template>
<div>
  <ChangeInfoAvatar v-show='openedForm' @close='close' />
   <div class='profileChange'>
      <div class='profileChange__poster'>
        <label for='avatar' v-if='noAvatar'>
          <user-avatar :src='user.poster' :width='50' :height='50' />
        </label>
        <UserAvatar :src='user.poster' v-else @click='open' :width='50' :height='50' />
      </div>
      <div class='profileChange__text'>
        <div class='profileChange__name'>{{user.name}}</div>
        <div class='profileChange__action'>
          <span @click='open'>Изменить фото профиля</span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import ChangeInfoAvatar from './ChangeInfoAvatar'
import UserAvatar from '../Layout/UserAvatar'
export default {
  name: 'ChangeInfoHeader',
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
    noAvatar () {
      return !this.user.poster
    }
  },
  components: { ChangeInfoAvatar, UserAvatar }
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

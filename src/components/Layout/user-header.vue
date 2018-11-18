<template>
  <div class="user_info">
    <div class="user_photo">
      <img :src="(user.poster && user.poster.src) || ($settings['default-avatar'])" alt="">
    </div>
    <div class="user_description">
      <h2>{{ user.name }}</h2>
      <div class="user_controlls" v-if='controlls'>
        <primary-btn :text='"Редактировать профиль"' @click='edit'/>
        <secondary-btn :text='"Добавить фото"' @click='open'/>
        <new-post-popup v-if='newPost' @fail='close' @loaded='loaded'/>
      </div>
      <div class="user_controlls" v-else>
        <primary-btn :text='"Отписаться"' @click='unsub' v-if='user.subscriber' />
        <secondary-btn :text='"Подписаться"' @click='sub' v-else />
      </div>
      <user-properties :posts='user.postsCount' :subscribers='user.subscribersCount' :subscribes='user.subscribesCount' />
    </div>
  </div>
</template>
<script>
import primaryBtn from '../Controlls/primary-button'
import secondaryBtn from '../Controlls/secondary-button'
import newPostPopup from '../NewPost/new-post-popup'
import userProperties from './user-properties'
export default {
  name: 'user-header',
  data () {
    return {
      newPost: false
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    controlls: Boolean
  },
  methods: {
    loaded (src) {
      this.$emit('loaded', src)
    },
    edit () {
      this.$router.push('/settings')
    },
    sub () {
      this.$store.dispatch('sub', this.user.id).then(() => {
        this.$sticky.add({
          text: 'Успешно подписались'
        })
      })
    },
    unsub () {
      this.$store.dispatch('unsub', this.user.id).then(() => {
        this.$sticky.add({
          text: 'Успешно отписались',
          type: 'warning'
        })
      })
    },
    open () {
      this.newPost = true
    },
    close () {
      this.newPost = false
    }
  },
  components: {primaryBtn, secondaryBtn, newPostPopup, userProperties}
}
</script>

<style scoped>
.user_info {
  margin-top: 71px;
  display: flex;
  /* justify-content: space-around; */
  padding-left: 105px;
}
.user_info h2 {
  font-size: 23px;
  font-weight: bold;
}
.user_photo {
  margin-right: 84px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}
.user_photo img {
  width: 100%;
}
</style>

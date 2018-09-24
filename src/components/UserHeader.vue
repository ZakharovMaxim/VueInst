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
      <div class="user_properties">
        <p><span class='user_properties__value'>{{ user.postsCount }}</span> публикаций</p>
        <p :class='{active: user.subscribersCount}'><span class='user_properties__value'>{{ user.subscribersCount }}</span> смотрят</p>
        <p :class='{active: user.subscribesCount}'><span class='user_properties__value'>{{ user.subscribesCount }}</span> просматриваемых</p>
      </div>
    </div>
  </div>
</template>
<script>
import primaryBtn from './Buttons/primary-button'
import secondaryBtn from './Buttons/secondary-button'
import newPostPopup from './new-post-popup'
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
      this.$store.dispatch('sub', this.user.id)
    },
    unsub () {
      this.$store.dispatch('unsub', this.user.id)
    },
    open () {
      this.newPost = true
    },
    close () {
      this.newPost = false
    }
  },
  components: {primaryBtn, secondaryBtn, newPostPopup}
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
.user_properties {
  margin-top: 14px;
  display: flex;
}
.user_properties p {
  color: black;
  font-size: 13px;
  font-weight: 300;
  text-decoration: none;
}
.user_properties p.active {
  cursor: pointer;
}
.user_properties span {
  font-weight: bold;
  font-size: 14px;
}

.user_properties p:nth-child(2) {
  position: relative;
  margin-right: 13px;
  margin-left: 23px;
}
.user_properties p:nth-child(2)::before {
  position: absolute;
  top:0;
  left:-9px;
  content: '';
  display: block;
  background-color: #BDBDBD;
  width: 1px;
  height: 20px;
}
.user_properties p:nth-child(2)::after {
  position: absolute;
  top:0;
  right:-9px;
  content: '';
  display: block;
  background-color: #BDBDBD;
  width: 1px;
  height: 20px;
}
</style>

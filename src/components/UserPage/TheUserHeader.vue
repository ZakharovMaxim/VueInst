<template>
  <div class='user_info'>
    <div class='user_photo'>
      <UserAvatar :src='(user.poster && user.poster.src)' :alt='user.name' />
    </div>
    <div class='user_description'>
      <h2>{{ user.name }}</h2>
      <div class='user_controlls' v-if='controlls'>
        <ButtonPrimary text='Редактировать профиль' @click='edit'/>
        <ButtonSecondary text='Добавить фото' @click='open'/>
        <NewPostPopup v-if='newPost' @fail='close' @loaded='loaded'/>
      </div>
      <div class='user_controlls' v-else>
        <ButtonPrimary text='Отписаться' @click='commitUnSub' v-if='user.subscriber' />
        <ButtonSecondary text='Подписаться' @click='commitSub' v-else />
      </div>
      <TheUserProperties :subscribers='user.subscribersCount' :subscribes='user.subscribesCount' :posts='posts' />
    </div>
  </div>
</template>
<script>
import ButtonPrimary from '../Controlls/ButtonPrimary'
import ButtonSecondary from '../Controlls/ButtonSecondary'
import NewPostPopup from '../NewPost/NewPostPopup'
import TheUserProperties from './TheUserProperties'
import UserAvatar from '../Layout/UserAvatar'
export default {
  name: 'TheUserHeader',
  props: {
    user: {
      type: Object,
      required: true
    },
    controlls: Boolean,
    posts: Number,
    newPost: Boolean
  },
  methods: {
    loaded (src) {
      this.$emit('loaded', src)
    },
    edit () {
      this.$emit('edit')
    },
    commitSub () {
      this.$emit('commitSub')
    },
    commitUnSub () {
      this.$emit('commitUnSub')
    },
    open () {
      this.$emit('open')
    },
    close () {
      this.$emit('close')
    }
  },
  components: { ButtonPrimary, ButtonSecondary, NewPostPopup, TheUserProperties, UserAvatar }
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
@media screen and (max-width: 650px) {
  .user_info {
    padding-left: 0;
    justify-content: center;
    margin-top: 10px;
  }
  .user_controlls {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .user_controlls button:first-child {
    margin-bottom: 5px;
  }
}
@media screen and (max-width: 550px) {
  .user_info {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .user_description {
    display: flex;
    /* align-items: center; */
    flex-direction: column;
  }
}
</style>

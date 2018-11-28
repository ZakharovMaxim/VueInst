<template>
  <ThePopup @close='close'>
    <div class='form'>
      <div class='form__header'>
        <div class='form__header-title'>{{type}}</div>
        <div class='form__header-close'>
          <span class='icon-cross-out' @click='close'></span>
        </div>
      </div>
      <div class='form__content'>
        <div class='list'>
          <div class='list__item' v-for='(item, i) in list' :key='i'>
            <div class='list__item-left'>
              <div class='list__item-poster'>
                <UserAvatar :src='item.poster && item.poster.src' :alt='`${item.name}(${item.login})`' :width='50' :height='50' />
              </div>
              <div class='list__item-info'>
                <div class='list__item-name'>
                  <router-link :to='"/"+item.login'>
                    {{item.name}}
                  </router-link>
                </div>
                <div class='list__item-login'>{{item.login}}</div>
              </div>
            </div>
            <div class='list__item-right'>
              <div class='list__item-subs' v-if='item.login !== currentUser.login'>
                <ButtonSecondary text='Подписаться' v-if='!item.subscribed' @click='sub(item._id)' />
                <ButtonPrimary text='Отписаться' v-else @click='unsub(item._id)' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ThePopup>
</template>

<script>
import ButtonPrimary from '@/components/Controlls/ButtonPrimary'
import ButtonSecondary from '@/components/Controlls/ButtonSecondary'
import ThePopup from '@/components/Layout/ThePopup'
import UserAvatar from '@/components/Layout/UserAvatar'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserList',
  props: {
    type: {
      required: true,
      type: String
    },
    setter: {
      required: true,
      type: String
    },
    getter: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    list () {
      return this.$store.getters[this.getter]
    }
  },
  components: { ButtonPrimary, ThePopup, ButtonSecondary, UserAvatar },
  created () {
    this.$store.dispatch(this.setter, this.$route.params.login)
  },
  methods: {
    ...mapActions(['sub', 'unsub']),
    close (e) {
      let newPath = this.$route.path.split('/')
      newPath = newPath.slice(0, newPath.length - 1).join('/')
      this.$router.replace(newPath)
    }
  }
}
</script>

<style scoped>
.form {
  width: 100%;
  max-width: 400px;
  background: #fff;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}
.form__header {
  padding: 5px;
  position: relative;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  height: 10%;
  box-shadow: 0 0 10px rgba(0,0,0,.3)
}
.form__header-close {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
.form__content {
  padding: 5px;
  overflow-y: auto;
  height: 90%;
}
.list__item {
  display: flex;
  justify-content: space-between;
}
.list__item-poster {
  margin-right: 10px;
}
.list__item-left {
  display: flex;
  align-items: stretch;
}
.list__item-name a {
  text-decoration: none;
  color: inherit;
}
</style>

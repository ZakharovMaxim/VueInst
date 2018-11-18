<template>
  <popup @close='close'>
    <div class="form">
      <div class="form__header">
        <div class="form__header-title">{{type}}</div>
        <div class="form__header-close">
          <span class="icon-cross-out" @click='close'></span>
        </div>
      </div>
      <div class="form__content">
        <div class='list'>
          <div class="list__item" v-for='(item, i) in list' :key='i'>
            <div class='list__item-left'>
              <div class="list__item-poster">
                <img :src="(item.poster && item.poster.src) || $settings['default-avatar']" alt="">
              </div>
              <div class="list__item-info">
                <div class="list__item-name">{{item.name}}</div>
                <div class="list__item-login">{{item.login}}</div>
              </div>
            </div>
            <div class='list__item-right'>
              <div class="list__item-subs" v-if='item.login !== currentUser.login'>
                <btn-secondary :text='"Подписаться"' v-if='!item.subscribed' @click='sub(item._id)'/>
                <btn-primary :text='"Отписаться"' v-else @click='unsub(item._id)'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
import btnPrimary from './Controlls/primary-button'
import btnSecondary from './Controlls/secondary-button'
import popup from './Popup/popup'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'user-subscribers',
  props: {
    type: {
      required: true,
      type: String
    },
    callback: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    list () {
      return this.$store.getters[this.callback]
    }
  },
  components: {btnPrimary, popup, btnSecondary},
  created () {
    this.$store.dispatch(this.callback, this.$route.params.login).then(data => {
    }).catch(e => {
      console.log(e)
    })
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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
.list__item-left {
  display: flex;
  align-items: stretch;
}
.list__item-poster {
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: 10px;
  border-radius: 50%;
}
.list__item-poster img {
  width: 100%;
  height: 100%;
}
</style>

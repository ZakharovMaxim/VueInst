<template>
  <TheUserHeader :user='user'
  :controlls='controlls'
  :posts='posts'
  :newPost='newPost'
  @loaded='loaded'
  @close='close'
  @open='open'
  @edit='edit'
  @commitUnSub='commitUnSub'
  @commitSub='commitSub' />
</template>
<script>
import { mapActions } from 'vuex'
import TheUserHeader from './TheUserHeader'
import { SUB, UNSUB } from '@/store/modules/types/User_types'

export default {
  name: 'TheUserHeaderContainer',
  data () {
    return {
      newPost: false,
      subFuncName: SUB,
      unSubFuncName: UNSUB
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    controlls: Boolean,
    posts: Number
  },
  methods: {
    ...mapActions([SUB, UNSUB]),
    loaded (src) {
      this.$emit('loaded', src)
    },
    edit () {
      this.$router.push('/settings')
    },
    commitSub () {
      this[SUB](this.user.id).then(() => {
        this.$VueInst_Snackbar.add({
          text: 'Успешно подписались'
        })
      })
    },
    commitUnSub () {
      this[UNSUB](this.user.id).then(() => {
        this.$VueInst_Snackbar.add({
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
  components: { TheUserHeader }
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

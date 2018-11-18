<template>
  <content-vue>
    <div v-if='!newPost'>
      <fetch-data :callback='fetch'>
        <user-header :user='userInfo' :controlls='userInfo.id === currentUser.id' @loaded='loaded'/>
        <post-list :posts='posts' :postType='"user"' />
      </fetch-data>
    </div>
    <new-post v-else :img='newPostImg' @newPhoto='loaded' />
  </content-vue>
</template>
<script>
import { mapGetters } from 'vuex'
import contentVue from '../components/Layout/content-vue'
import loader from '../components/Layout/loading-user'
import PostList from '../components/Post/post-list'
import UserHeader from '../components/Layout/user-header'
import newPost from '../components/NewPost/new-post'
import fetchData from '../components/fetch-data'
export default {
  name: 'user-page',
  data () {
    return {
      newPost: false,
      newPostImg: {}
    }
  },
  methods: {
    loaded (obj) {
      this.newPostImg = obj
      this.newPost = true
    },
    fetch () {
      return this.$store.dispatch('getUser', this.$route.params.login)
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'posts', 'userInfo', 'currentUser'])
  },
  components: {contentVue, PostList, UserHeader, newPost, fetchData, loader}
}
</script>
<style>
  .main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main.registration {
    background: url('../assets/img/bg.jpg') 100% 100% no-repeat;
  }
  .align-content {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
  }
  .registration .align-content {
    align-items: center;
  }
</style>

<template>
  <Content>
    <div v-if='!newPost'>
      <user-header :user='userInfo' :controlls='userInfo.id === currentUser.id' @loaded='loaded'/>
      <PostList :posts='posts' :postType='"user"' />
    </div>
    <new-post v-else :img='newPostImg' @newPhoto='loaded'/>
  </Content>
</template>
<script>
import { mapGetters } from 'vuex'
import Content from '../components/content'
import PostList from '../components/Post/PostList'
import UserHeader from '../components/UserHeader'
import newPost from '../components/new-post'
export default {
  name: 'contentVue',
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
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'posts', 'userInfo', 'currentUser'])
  },
  created () {
    this.$store.dispatch('getUser', this.$route.params.login).then(data => {
    })
  },
  components: {Content, PostList, UserHeader, newPost}
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

<template>
  <TheContent>
    <div v-if='!newPost'>
      <FetchData :callback='fetch'>
        <TheUserHeaderContainer :user='userInfo' :controlls='userInfo.id === currentUser.id' @loaded='loaded' :posts='posts ? posts.length : 0'  v-title='userInfo.login + " | смотреть фото"'/>
        <PostList :posts='posts' postType='short' />
      </FetchData>
    </div>
    <NewPostContent v-else :img='newPostImg' @newPhoto='loaded' v-title='"Новый пост"' />
  </TheContent>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import TheContent from '@/components/Layout/TheContent'
import PostList from '@/components/Post/PostList'
import TheUserHeaderContainer from '@/components/UserPage/TheUserHeaderContainer'
import NewPostContent from '@/components/NewPost/NewPostContent'
import FetchData from '@/components/HOC/FetchData'
import { SET_USER } from '@/store/modules/types/User_types'

export default {
  name: 'UserPage',
  data () {
    return {
      newPost: false,
      newPostImg: {}
    }
  },
  methods: {
    ...mapActions([SET_USER]),
    loaded (obj) {
      this.newPostImg = obj
      this.newPost = true
    },
    fetch () {
      return this[SET_USER](this.$route.params.login)
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'posts', 'userInfo', 'currentUser'])
  },
  components: { TheContent, PostList, TheUserHeaderContainer, NewPostContent, FetchData }
}
</script>

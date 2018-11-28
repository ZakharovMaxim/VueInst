<template>
  <div class='main-page-content'>
    <TheHeader />
    <FetchData :callback='fetch'>
      <PostList :posts='posts' />
    </FetchData>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FetchData from '../HOC/FetchData'
import TheHeader from './TheHeader'
import PostList from '../Post/PostList'
import { SET_POSTS } from '@/store/modules/types/Post_types'
export default {
  name: 'TheMainPageContent',
  computed: {
    ...mapGetters(['posts'])
  },
  methods: {
    ...mapActions([SET_POSTS]),
    fetch () {
      return this[SET_POSTS]()
    }
  },
  components: { PostList, TheHeader, FetchData }
}
</script>

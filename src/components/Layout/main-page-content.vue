<template>
    <div class="main-page-content">
        <HeaderVue />
        <fetch-data :callback="fetch">
          <PostList :posts='posts' :postType='"subs"'/>
        </fetch-data>
    </div>
</template>
<script>
import HeaderVue from './header-vue'
import PostList from '../Post/post-list'
import fetchData from '../fetch-data'
import { mapGetters } from 'vuex'
export default {
  name: 'main-page-content',
  computed: {
    ...mapGetters(['posts'])
  },
  methods: {
    fetch () {
      return this.$store.dispatch('setPosts')
    }
  },
  components: {PostList, HeaderVue, fetchData}
}
</script>

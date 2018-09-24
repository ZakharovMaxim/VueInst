<template>
    <div class="main-page-content">
        <HeaderVue />
        <PostList :posts='posts' :postType='"subs"'/>
    </div>
</template>
<script>
import HeaderVue from './Header'
import PostList from './Post/PostList'
import { mapGetters } from 'vuex'
export default {
  name: 'MainPageContent',
  created () {
    this.$store.dispatch('setPosts')
  },
  computed: {
    ...mapGetters(['posts'])
  },
  components: {PostList, HeaderVue}
}
</script>

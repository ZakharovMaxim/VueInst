<template>
  <Content>
    <tabs :user='currentUser'/>
  </Content>
</template>
<script>
import { mapGetters } from 'vuex'
import Content from '../components/content'
import Tabs from '../components/Tabs'
export default {
  name: 'user-settings',
  computed: {
    ...mapGetters(['currentUser'])
  },
  components: {Content, Tabs}
}
</script>
<style>

</style>

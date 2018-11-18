<template>
  <content-vue>
    <tabs :user='currentUser'/>
  </content-vue>
</template>
<script>
import { mapGetters } from 'vuex'
import ContentVue from '../components/Layout/content-vue'
import Tabs from '../components/tabs'
export default {
  name: 'user-settings',
  computed: {
    ...mapGetters(['currentUser'])
  },
  components: {ContentVue, Tabs}
}
</script>
<style>

</style>

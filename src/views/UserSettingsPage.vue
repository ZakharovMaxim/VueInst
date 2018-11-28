<template>
  <TheContent v-title='"Настройки"'>
    <BaseTabs :user='currentUser'/>
  </TheContent>
</template>
<script>
import { mapGetters } from 'vuex'
import TheContent from '@/components/Layout/TheContent'
import BaseTabs from '@/components/Layout/BaseTabs'
export default {
  name: 'UserSettingsPage',
  computed: {
    ...mapGetters(['currentUser'])
  },
  components: {TheContent, BaseTabs}
}
</script>
<style>

</style>

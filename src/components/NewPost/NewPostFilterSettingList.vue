<template>
  <div class='filter-settings'>
    <NewPostFilterSetting :src='src' v-for='(filter, i) in filters' :key='i' :filter='filter' />
  </div>
</template>

<script>
import NewPostFilterSetting from './NewPostFilterSetting'
import { mapGetters } from 'vuex'
export default {
  name: 'NewPostFilterSettingList',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['filters'])
  },
  components: { NewPostFilterSetting }
}
</script>

<style scoped>
.filter-settings {
  display: flex;
  flex-wrap: wrap;
}
</style>

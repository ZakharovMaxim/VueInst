<template>
  <div class="filter-settings">
    <filter-setting :src='src' v-for='(filter, i) in filters' :key='i' :filter='filter'/>
  </div>
</template>

<script>
import filterSetting from './filter-setting'
import {mapGetters} from 'vuex'
export default {
  name: 'filter-list',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['filters'])
  },
  components: {
    filterSetting
  }
}
</script>

<style scoped>
.filter-settings {
  display: flex;
  flex-wrap: wrap;
}
</style>

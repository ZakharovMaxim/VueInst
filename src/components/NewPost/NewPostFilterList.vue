<template>
  <div class='filters'>
    <NewPostFilter :src='src' v-for='(setting, i) in filtersListData' :key='i' :filters='filters' :setting='setting'/>
  </div>
</template>

<script>
import NewPostFilter from './NewPostFilter'
import filtersListData from '../../tools/completeFilters'
import { mapGetters } from 'vuex'

export default {
  name: 'NewPostFilterList',
  data () {
    return {
      filtersListData
    }
  },
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
    NewPostFilter
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>

<template>
  <div class="filters">
    <filter-complete :src='src' v-for='(setting, i) in filtersList' :key='i' :filters='filters' :setting='setting'/>
  </div>
</template>

<script>
import filterComplete from './filter-complete'
import filtersList from '../../tools/completeFilters'
import {mapGetters} from 'vuex'
export default {
  name: 'filters',
  data () {
    return {
      filtersList
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
    filterComplete
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

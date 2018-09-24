<template>
  <div class="filters">
    <post-filter :src='src' v-for='(filter, i) in filters' :key='i' :filter='filter' @changed='change' @select='select' @unselect='unselect'/>
  </div>
</template>

<script>
import postFilter from './post-filter'
import filters from '../tools/filters'
export default {
  name: 'filter-list',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      filters
    }
  },
  components: {
    postFilter
  },
  methods: {
    change (payload) {
      this.$emit('changed', payload)
    },
    select (filter) {
      this.$emit('select', filter)
    },
    unselect (name) {
      this.$emit('unselect', name)
    }
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
}
</style>

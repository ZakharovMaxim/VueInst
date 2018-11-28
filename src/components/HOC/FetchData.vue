<template>
    <div class='loading-component'>
      <slot name='loading' v-if='loading && !error'>
        <TheLoader />
      </slot>
      <TheError v-else-if='error' :text='error'/>
      <slot v-else />
    </div>
</template>

<script>
import TheLoader from '../Layout/TheLoader'
import TheError from '../Layout/TheError'
export default {
  name: 'FetchData',
  data () {
    return {
      loading: true,
      error: null
    }
  },
  props: {
    callback: {
      type: Function,
      required: true
    },
    props: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  /**
   * component take callback whick returns promise, if promise resolved, show content otherwise show error,
   * while promise is pending show loading component
   */
  created () {
    this.callback().then(() => {
      this.loading = false
      this.error = null
    }).catch(e => {
      this.loading = false
      this.error = e.response.data.message || 'Что-то пошло не так :('
    })
  },
  components: { TheLoader, TheError }
}
</script>

<style scoped>
.loading-component {
  width: 100%
}
</style>

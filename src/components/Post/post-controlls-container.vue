<template>
  <post-controlls :opened='opened' :actions='actions' v-on='listeners' :confirm='confirm' @closeConfirm='closeConfirm' @removePost='removePostConfirmed' />
</template>

<script>
import {mapActions} from 'vuex'
import postControlls from './post-controlls'
import { removeCommentBus } from '../Buses/Buses.js'
export default {
  name: 'post-controlls-container',
  components: {postControlls},
  data () {
    return {
      opened: false,
      confirm: false,
      actions: [
        {
          name: 'Удалить коммент',
          event: 'removeCommentOpen',
          class: 'danger'
        }
      ]
    }
  },
  created () {
    if (this.rights) {
      this.actions.push({
        name: 'Удалить пост',
        event: 'removePostPopup',
        class: 'danger'
      })
    }
  },
  computed: {
    listeners () {
      const listeners = this.actions.reduce((prev, current) => {
        prev[current.event] = this[current.event]
        return prev
      }, {})
      listeners['open'] = this.open
      listeners['close'] = this.close
      return listeners
    }
  },
  props: {
    rights: Boolean,
    postId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(['removePost']),
    open () {
      this.opened = true
    },
    close () {
      this.opened = false
    },
    removeCommentOpen () {
      this.close()
      removeCommentBus.$emit('removeCommentOpen')
    },
    removePostPopup () {
      this.close()
      this.confirm = true
    },
    closeConfirm () {
      this.confirm = false
    },
    removePostConfirmed () {
      this.removePost(this.postId)
    }
  }
}
</script>

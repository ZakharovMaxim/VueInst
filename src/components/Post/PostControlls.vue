<template>
  <div class='post-controlls'>
    <span class='sign' @click='$emit("open")'>...</span>
    <ThePopup v-if='opened' @close='$emit("close")'>
      <ul>
        <li
        tabindex='0'
        v-for='(action, i) in actions'
        :key='i'
        @click='$emit(`${action.event}`)'
        :class='{[action.class]: action.class}'
        >
          {{action.name}}
        </li>
        <li @click='$emit("close")'>Отмена</li>
      </ul>
    </ThePopup>
    <ConfirmForm @success='removePost' @fail='closeConfirm' v-if='confirm' />
  </div>
</template>

<script>
import ThePopup from '../Layout/ThePopup'
import ConfirmForm from '../Controlls/ConfirmForm'
export default {
  name: 'PostControlls',
  props: {
    opened: Boolean,
    confirm: Boolean,
    actions: {
      type: Array,
      default () {
        return [{
          name: 'Отмена',
          event: 'close'
        }]
      }
    }
  },
  methods: {
    removePost () {
      this.$emit('removePost')
    },
    closeConfirm () {
      this.$emit('closeConfirm')
    }
  },
  components: { ThePopup, ConfirmForm }
}
</script>

<style>
.post-controlls {
  display: flex;
  align-items: center;
  height: 100%;
}
.sign {
  font-weight: bold;
  cursor: pointer;
  height: 30px;
}
</style>

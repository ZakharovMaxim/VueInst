<template>
  <div class="post-controlls">
    <span class='sign' @click='$emit("open")'>...</span>
    <popup v-if='opened' @close='$emit("close")'>
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
    </popup>
    <confirm-form @success='removePost' @fail='closeConfirm' v-if='confirm' />
  </div>
</template>

<script>
import popup from '../Popup/popup'
import confirmForm from '../Controlls/confirm-form'
export default {
  name: 'post-controlls',
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
  components: {
    popup,
    confirmForm
  }
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

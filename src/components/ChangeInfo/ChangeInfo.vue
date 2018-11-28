<template>
  <ChangeInfoForm :user='user' />
</template>

<script>
import ChangeInfoForm from './ChangeInfoForm'
export default {
  name: 'ChangeInfo',
  components: { ChangeInfoForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

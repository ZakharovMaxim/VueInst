<template>
  <div class='filter-setting' :class='{"filter-setting-active": filter.active}'>
    <div class='filter-setting__name'>{{ filter.name }}</div>
    <div class='filter-setting__preview' @click='toggleState'>
      <CanvasImage :src='src' :filters='[filter]' :present='true' />
    </div>
    <BaseToddler :max='filter.max' :min='filter.min' :initialValue='this.filter.value' v-show='filter.active' @changed='change' />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CanvasImage from './CanvasImage'
import BaseToddler from '../Controlls/BaseToddler'
import { REMOVE_FILTER, ADD_FILTER, CHANGE_FILTER_VALUE } from '@/store/modules/types/NewPost_types'
export default {
  name: 'NewPostFilterSetting',
  props: {
    src: {
      type: String,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([REMOVE_FILTER, ADD_FILTER, CHANGE_FILTER_VALUE]),
    toggleState () {
      if (this.filter.active) {
        this[REMOVE_FILTER](this.filter.canvasName)
      } else {
        this[ADD_FILTER](this.filter.canvasName)
      }
    },
    change (value) {
      this[CHANGE_FILTER_VALUE]({
        value,
        canvasName: this.filter.canvasName
      })
    }
  },
  components: { CanvasImage, BaseToddler }
}
</script>

<style scoped>
.filter-setting {
  width: 24%;
  padding: 5px;
  margin-right: 1%;
  border: 1px solid transparent;
  transition: all .2s;
}
.filter-setting-active {
  border-color: #3897F0;
}
.filter-setting img {
  width: 100%;
}
.filter-setting:nth-child(3n) {
  margin-right: 0;
}
.filter-setting__name {
  font-size: 10px;
  font-weight: bold;
  color: #C0BBBB;
  margin-bottom: 5px;
}
.filter-setting__preview {
  cursor: pointer;
}
@media screen and (max-width: 650px) {
  .filter-setting {
    width: 45%;
    margin-right: 5%;
  }
}
</style>

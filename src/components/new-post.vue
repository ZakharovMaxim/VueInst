<template>
    <div class="newPost">
      <div class="newPost__title newPost__title-center">Публикация фотографии</div>
      <div class="row">
        <div class="col">
          <canvas-image :src='src' :filters='filters'/>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="description">Описание</label>
            <textarea id="description"></textarea>
            <div class="controls">
              <secondary-btn text='Опубликовать' :size='"small"'/>
              <primary-btn text='Выбрать другую' :size='"small"' @click='openDialog' />
              <input type="file" ref='file' v-show='false' @change='newPhoto'>
            </div>
          </div>
          <div class="newPost__title">Фильтры</div>
          <filter-list :src='src' @changed='change' @select='select' @unselect='unselect' />
        </div>
      </div>
    </div>
</template>

<script>
import primaryBtn from './Buttons/primary-button'
import secondaryBtn from './Buttons/secondary-button'
import canvasImage from './canvas-image'
import filterList from './filter-list'
export default {
  name: 'new-post',
  components: {primaryBtn, secondaryBtn, canvasImage, filterList},
  data () {
    return {
      src: this.img.source,
      filters: []
    }
  },
  props: {
    img: {
      type: Object,
      required: true
    }
  },
  methods: {
    change (payload) {
      const filter = this.filters.find(filter => filter.canvasName === payload.canvasName)
      if (!filter) return
      filter.value = payload.value
    },
    newPhoto (e) {
      const f = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = e => {
        this.src = e.target.result
        this.$emit('newPhoto', {
          src: e.target.result
        })
      }
    },
    openDialog () {
      this.$refs.file.click()
    },
    unselect (name) {
      const filterIndex = this.filters.findIndex(filter => filter.canvasName === name)
      if (!~filterIndex) return
      this.filters.splice(filterIndex, 1)
    },
    select (filter) {
      if (!filter.value) filter.value = filter.min
      if (!~this.filters.indexOf(filter)) this.filters.push(filter)
    }
  }
}
</script>

<style scoped>

.newPost {
  margin: 54px auto 0 auto;
  background: #fff;
  padding: 15px 42px 30px 42px;
  width: 90%;
}
.newPost__title {
  font-weight: bold;
  font-size: 15px;
}
.newPost__title-center {
  text-align: center;
  margin-bottom: 26px;
}
.row {
  display: flex;
}
.col {
  flex: 1;
  padding: 0 15px;
}
img {
  width: 100%;
}
.form-group {
  margin-bottom: 28px;
}
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}
.form-group textarea {
  resize: none;
  width: 100%;
  height: 83px;
  font-family: inherit;
  padding: 5px;
}
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}
</style>

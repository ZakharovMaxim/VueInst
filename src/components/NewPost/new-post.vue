<template>
    <div class="newPost">
      <div class="newPost__title newPost__title-center">Публикация фотографии</div>
      <div class="row">
        <div class="col">
          <canvas-image :src='src' :filters='appliedFilters' :main='true'/>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="description">Описание</label>
            <textarea id="description"></textarea>
            <div class="controls">
              <secondary-btn text='Опубликовать' :size='"small"' @click='post'/>
              <primary-btn text='Выбрать другую' :size='"small"' @click='openDialog' />
              <input type="file" ref='file' v-show='false' @change='newPhoto'>
            </div>
          </div>
          <div class="newPost__title">Фильтры</div>
          <filters :src='src' />
        </div>
      </div>
      <div class="row">
          <div>
            <div class="newPost__title">Настройки</div>
            <filter-settings :src='src' />
          </div>
      </div>
    </div>
</template>

<script>
import primaryBtn from '../Controlls/primary-button'
import secondaryBtn from '../Controlls/secondary-button'
import canvasImage from './canvas-image'
import filterSettings from './filter-settings'
import filters from './filters'
import {mapGetters} from 'vuex'
export default {
  name: 'new-post',
  components: {primaryBtn, secondaryBtn, canvasImage, filterSettings, filters},
  data () {
    return {
      src: this.img.source
    }
  },
  created () {
    this.$store.dispatch('initFilters')
  },
  props: {
    img: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['filters']),
    appliedFilters () {
      return this.filters.filter(f => f.active)
    }
  },
  methods: {
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
    post () {
      this.$store.dispatch('savePost').then(() => {
        location.reload()
      }).catch(e => {
        console.dir(e)
      })
    },
    openDialog () {
      this.$refs.file.click()
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
.col {
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

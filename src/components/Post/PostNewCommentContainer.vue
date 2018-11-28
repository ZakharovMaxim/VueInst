<template>
  <div class='post_newComment'>
    <div class='loading' v-if='proccesing'></div>
    <textarea placeholder='Добавьте коментарий' ref='newComment' @keydown.enter.prevent='submit' v-model='value' @blur='blur' :disabled='proccesing'></textarea>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { NEW_COMMENT } from '@/store/modules/types/Post_types'
export default {
  name: 'PostNewCommentContainer',
  data () {
    return {
      value: '',
      proccesing: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    focusOnNewComment: Boolean
  },
  watch: {
    focusOnNewComment (v) {
      if (v) {
        this.$refs['newComment'].focus()
      } else {
        this.$refs['newComment'].blur()
      }
    }
  },
  methods: {
    ...mapActions([NEW_COMMENT]),
    focus () {
      const ref = this.$refs.newComment
      if (!ref) return
      ref.focus()
    },
    blur () {
      this.$emit('blur')
    },
    submit (e) {
      if (!this.value) return
      this.proccesing = true
      this.$refs.newComment.disabled = true
      this[NEW_COMMENT]({post_id: this.id, text: this.value}).then(r => {
        this.value = ''
        this.$refs.newComment.disabled = false
        this.$refs.newComment.focus()
        this.proccesing = false
      })
    }
  }
}
</script>
<style scoped>
.post_newComment {
  position: relative;
  width: 100%;
}
.post_newComment textarea {
  padding: 10px;
  max-height: 100%;
  width: 100%;
  border:none;
  border-top: 1px solid grey;
  outline: none;
  font-size: 15px;
  background-color: transparent;
  resize: none;
  font-family: inherit;
}
.loading {
  width: 102%;
  height: 102%;
  position: absolute;
  top: -1%;
  left: -1%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading:after {
  content: '\f105';
  font-family: 'Flaticon';
  animation: spin 1s linear infinite;
  transform-origin: 50%;
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

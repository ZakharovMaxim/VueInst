<template>
  <div class="post_newComment">
    <div class="loading" v-if='proccesing'></div>
    <textarea placeholder="Добавьте коментарий" ref='newComment' @keydown.enter.prevent="submit" v-model='value'></textarea>
  </div>
</template>
<script>
export default {
  name: 'new-comment',
  data () {
    return {
      value: '',
      proccesing: false
    }
  },
  props: ['id'],
  methods: {
    focus () {
      const ref = this.$refs.newComment
      if (!ref) return
      ref.focus()
    },
    submit (e) {
      if (!this.value) return
      this.proccesing = true
      this.$refs.newComment.disabled = true
      this.$store.dispatch('newComment', {post_id: this.id, text: this.value}).then(r => {
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
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
}
.post_newComment textarea {
  padding: 20px 0px 5px 0px;
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
  background: rgba(0, 0, 0, .2);
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
  transform-origin: center center;
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

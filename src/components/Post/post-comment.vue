<template>
  <div class="post_comment">
      <ConfirmForm @success='remove' @fail='confirmRemove = false' v-if='confirmRemove' :title='"Удалить комментарий?"'/>
      <a :href="'/' + authorLogin" class="post_comment-name"><span>{{comment.user_id && comment.user_id.name}}</span></a>
      <span>{{comment.text}}</span>
      <span class="icon-cross-out remove-comment" v-if='rights && removeCommentOpened' @click='confirmRemove = true'></span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ConfirmForm from '../Controlls/confirm-form'
export default {
  name: 'post-comment',
  components: { ConfirmForm },
  computed: {
    ...mapGetters(['currentUser']),
    rights () {
      return this.comment.user_id._id === this.post_owner || this.comment.user_id._id === this.currentUser.id
    }
  },
  data () {
    return {
      confirmRemove: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    removeCommentOpened: Boolean,
    post_owner: String,
    authorLogin: String,
    post_id: {
      type: String,
      required: true
    }
  },
  methods: {
    remove () {
      this.$store.dispatch('removeComment', {
        post_id: this.post_id,
        id: this.comment._id
      })
    }
  }
}
</script>
<style scoped>
.post_comment {
  margin-bottom: 10px;
  position: relative;
  padding-right: 15px;
  font-size: 14px;
}
.post_comment-name {
  font-weight: bold;
  color: #262626;
  text-decoration: none;
  font-size: 13px;
}
.remove-comment {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.remove-comment:before {
  font-size: 12px;
}
</style>

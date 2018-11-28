<template>
  <div class='post_comment'>
      <ConfirmForm @success='remove' @fail='confirmRemove = false' v-if='confirmRemove' title='Удалить комментарий?' />
      <a :href='"/" + authorLogin' class='post_comment-name'><span>{{user_name}}</span></a>
      <span>{{text}}</span>
      <span class='icon-cross-out remove-comment' v-if='showRemoveButton' @click='confirmRemove = true'></span>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ConfirmForm from '../Controlls/ConfirmForm'
import { REMOVE_COMMENT } from '@/store/modules/types/Post_types'
export default {
  name: 'PostComment',
  components: { ConfirmForm },
  computed: {
    ...mapGetters(['currentUser'])
  },
  data () {
    return {
      confirmRemove: false
    }
  },
  props: {
    authorLogin: {
      type: String,
      required: true
    },
    id: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    user_name: {
      type: String,
      required: true
    },
    showRemoveButton: Boolean
  },
  methods: {
    ...mapActions([REMOVE_COMMENT]),
    remove () {
      this[REMOVE_COMMENT]({
        post_id: this.postId,
        id: this.id
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

<template>
  <div class='sticky'>
    <div class='sticky__list'>
      <div class='stick'
        v-for='(item, i) in items'
        :key='i'
        @mouseover='clearTimeout(item)'
        @mouseleave='setTimeout(item)'
      >
        <div class='stick__close' @click='remove(item.id)'>
          <span class='icon-cross-out'></span>
        </div>
        <div class='stick__message' :class='{"stick__message--warning": item.type === "warning", "stick__message--error": item.type === "error"}'>
          <span>{{item.text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SnackBar',
  data () {
    return {
      items: [],
      delay: 3000
    }
  },
  mounted () {
    Vue.prototype.$VueInst_Snackbar = this
  },
  methods: {
    add (item) {
      const lastItem = this.items[this.items.length - 1]
      const id = lastItem ? lastItem.id + 1 : 1
      this.items.push({
        ...item,
        id,
        timer: setTimeout(() => {
          this.remove(id)
        }, this.delay)
      })
    },
    remove (id) {
      const foundIndex = this.items.findIndex(item => item.id === id)
      if (!~foundIndex) return
      this.items.splice(foundIndex, 1)
    },
    clearTimeout (item) {
      clearTimeout(item.timer)
    },
    setTimeout (item) {
      item.timer = setTimeout(() => {
        this.remove(item.id)
      }, this.delay)
    }
  }
}
</script>

<style>
  .sticky {
    position: fixed;
    bottom: 10px;
    right: 10px;
    max-width: 350px;
  }
  .stick {
    width: 100%;
    position: relative;
    color: #fff;
    margin: 8px;
  }
  .stick.fade-out {
    opacity: 0;
    transition: all 1s;
  }
  .stick__close {
    position: absolute;
    top: 50%;
    right: 10px;
    cursor: pointer;
    transition: all .2s;
    color: #fff;
    border-radius: 50%;
    font-size: 10px;
    width: 25px;
    height: 25px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stick__close:hover {
    background: rgba(0,0,0,.1);
  }
  .stick:first-child:not(:last-child) .stick__message {
    border-radius: 5px 5px 0 0;
  }
  .stick:last-child:not(:first-child) .stick__message {
    border-radius: 0 0 5px 5px;
  }
  .stick__message {
    padding: 8px 40px 8px 10px;
    background: #43a047;
    text-align: center;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.1);
  }
  .stick__message--warning {
    background: #ffa000;
  }
  .stick__message--error {
    background: #d32f2f;
  }
</style>

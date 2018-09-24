<template>
    <div class="search">
      <span class="icon-search"></span>
      <input type="search"  placeholder="Поиск" @input='search' v-model='input' @focus='focus' @blur='blur'>
      <div class="search-results" v-if='focused'>
        <ul>
          <li v-for='(result, i) in searchResult' :key='i'>{{result.name}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchField',
  computed: {
    ...mapGetters(['searchResult'])
  },
  data () {
    return {
      input: '',
      focused: false
    }
  },
  methods: {
    search () {
      this.$store.dispatch('search', this.input)
    },
    focus () {
      this.focused = true
      // this.search()
    },
    blur () {
      this.focused = false
    }
  }
}
</script>
<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search {
  height: 34px;
  width: 230px;
  padding-left: 11px;
  background-color: #F0F0F0;
  border: 1px solid #DEDCDC;
  border-radius: 5px;
  margin-left: -111px;
  position: relative;
}
input[type="search"] {
  position: relative;
  border: none;
  outline: none;
  background-color: #F0F0F0;
  padding: 10px 11px 8px 44px;
  font-size: 13px;
  color: #C4C4C4;
}
.search span {
  position: absolute;
  z-index: 10;
  width: 20px;
}
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

}
</style>

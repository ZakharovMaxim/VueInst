<template>
    <div class='search'>
      <span class='icon-search'></span>
      <input type='search'  placeholder='Поиск' @input='searchCommit' v-model='input' @focus='focus' @blur='blur'>
      <div class='search-results' v-if='focused'>
        <div class='search-result' v-for='(result, i) in searchResult' :key='i' @click='redirect(result.login)'>
          <div class='search-result__poster'>
            <UserAvatar :src='result.poster && result.poster.src' :width='30' :height='30' />
          </div>
          <div class='search-result__info'>
            <div class='search-result__name'><a :href='"/" + result.login'>{{result.name}}</a></div>
            <div class='search-result__login'>{{result.login}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UserAvatar from './UserAvatar'
import { SEARCH } from '@/store/modules/types/App_types'

export default {
  name: 'TheSearchField',
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
    ...mapActions([SEARCH]),
    searchCommit () {
      this[SEARCH](this.input)
    },
    focus () {
      this.focused = true
    },
    blur (e) {
      if (e.relatedTarget && e.relatedTarget.tagName === 'A') return
      this.focused = false
    },
    redirect (login) {
      this.$router.push('/' + login)
    }
  },
  components: { UserAvatar }
}
</script>
<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  width: 230px;
  margin-left: -111px;
  position: relative;
}
input[type='search'] {
  position: relative;
  background-color: #F0F0F0;
  border: 1px solid #DEDCDC;
  border-radius: 5px;
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
  left: 20px;
}
.search-results {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 5px;
}
.search-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
}
.search-result__poster {
  width: 15%;
  padding-top: 15%;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 5%;
}
.search-result__poster img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.search-result__info {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
}
.search-result__name a {
  text-decoration: none;
  font-weight: bold;
  color: inherit;
}
.search-result__login {
  font-weight: 300;
}

@media screen and (max-width: 650px) {
  .search {
    margin-left: 0;
  }
}
</style>

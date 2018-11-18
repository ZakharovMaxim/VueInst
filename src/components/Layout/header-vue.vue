<template>
    <div>
      <div class="fake"></div>
      <header :class='{fixed: fixedNavigation}'>
      <div class="content">
        <div class="header_content">
          <Logo main={true} :fixed='fixedNavigation' />
          <SearchField />
        <div class="right_menu" v-if='currentUser'>
          <a :href="'/' + currentUser.login"><span class="icon-man"></span></a>
          <span class="icon-like"></span>
        </div>
      </div>
      </div>
    </header>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './logo'
import SearchField from './search-field'
export default {
  name: 'header-vue',
  components: { Logo, SearchField },
  computed: {
    ...mapGetters(['fixedNavigation', 'currentUser'])
  }
}
</script>
<style scoped>
.fake {
  height: 80px;
}
header {
  width: 100%;
  background-color: #fff;
  border-bottom: 0.5px solid #cccaca;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  transition: all .2s
}
header.fixed {
  padding: 0;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
}
.header_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right_menu a {
  font-size: 20px;
}
.right_menu a:first-child {
  margin-right: 10px;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>

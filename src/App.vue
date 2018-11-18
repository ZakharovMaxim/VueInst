<template>
  <div id="app">
    <router-view></router-view>
    <router-view name='list'></router-view>
    <sticky />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import debounce from './tools/Debounce'
import Network from './tools/Network'
import sticky from './components/sticky'
export default {
  name: 'App',
  created () {
    this.getToken()
    Network.initInterceptors(this)
    const callback = debounce((e) => this.fixNavigation(e), 100)
    window.addEventListener('scroll', callback)
  },
  methods: {
    ...mapActions(['removeToken', 'getToken']),
    fixNavigation (e) {
      if (!e) return
      const w = window
      if (w.scrollY > 300) {
        this.$store.dispatch('fixNavigation')
      } else {
        this.$store.dispatch('unFixNavigation')
      }
    }
  },
  components: {sticky}
}
</script>

<style>
* {
  box-sizing: border-box;
}
body, html, #app {
  min-height: 100%;
  background-color: #FAFAFA;
  font-family: 'Open Sans';
}
#app {
  height: 1px;
}
.content {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}
.w100 {
    width: 100%;
  }
button {
  cursor: pointer;
}
* {
  padding: 0;
  margin: 0;
}
@font-face {
  font-family: "Flaticon";
  src: url("./assets/fonts/Flaticon.eot");
  src: url("./assets/fonts/Flaticon.eot?#iefix") format("embedded-opentype"),
       url("./assets/fonts/Flaticon.woff") format("woff"),
       url("./assets/fonts/Flaticon.ttf") format("truetype"),
       url("./assets/fonts/Flaticon.svg#Flaticon") format("svg");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: url("./assets/fonts/OpenSans-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: url("./assets/fonts/OpenSans-Bold.ttf");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: url("./assets/fonts/OpenSans-Light.ttf");
  font-weight: 300;
  font-style: normal;
}
@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: "Flaticon";
    src: url("./assets/fonts/Flaticon.svg#Flaticon") format("svg");
  }
}

[class^="icon-"]:before, [class*=" icon-"]:before,
[class^="icon-"]:after, [class*=" icon-"]:after {
  font-family: Flaticon;
        font-size: inherit;
font-style: normal;
}

.icon-like:before { content: "\f100"; }
.icon-comment:before { content: "\f101"; }
.icon-search:before { content: "\f102"; }
.icon-man:before { content: "\f103"; }
.icon-cross-out:before { content: "\f104"; }
.icon-spinner-circle:before { content: "\f105"; }
.flaticon-keyboard-right-arrow-button:before { content: "\f106"; }
</style>

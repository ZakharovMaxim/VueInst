<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import debounce from './tools/Debounce'
export default {
  name: 'App',
  beforeCreate () {
    this.$store.dispatch('getToken')
    const callback = debounce((e) => this.fixNavigation(e), 100)
    window.addEventListener('scroll', callback)
  },
  methods: {
    fixNavigation (e) {
      if (!e) return
      const w = window
      if (w.scrollY > 300) {
        this.$store.dispatch('fixNavigation')
      } else {
        this.$store.dispatch('unFixNavigation')
      }
    }
  }
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
.content {
  flex: 1 0 auto;
  max-width: 860px;
  margin: 0 auto;
}
.w100 {
    width: 100%;
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

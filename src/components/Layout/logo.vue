<template>
  <div class="logo" :class="{mainLogo: main, fixed: fixed}">
    <a href="/">
    <svg viewBox="0 0 91 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>VueInst</title>
      <g id="Canvas" transform="translate(479 459)">
        <g id="Group">
          <g id="Group">
            <g id="Vector (Stroke)" filter="url(#filter0_d)">
              <use xlink:href="#path0_fill" transform="translate(-471.808 -454.692)" fill="#219653"></use>
            </g>
            <g id="Vector (Stroke)" filter="url(#filter1_d)">
              <use xlink:href="#path1_fill" transform="translate(-460.741 -458.955)" fill="#F2C94C"></use>
            </g>
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_d" filterUnits="userSpaceOnUse" x="-479" y="-455" width="91" height="76" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"></feColorMatrix>
          <feOffset dx="0" dy="6.40511"></feOffset>
          <feGaussianBlur stdDeviation="3.20255"></feGaussianBlur>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
        </filter>
        <filter id="filter1_d" filterUnits="userSpaceOnUse" x="-468" y="-459" width="67" height="59" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"></feColorMatrix>
          <feOffset dx="0" dy="6.40511"></feOffset>
          <feGaussianBlur stdDeviation="3.20255"></feGaussianBlur>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
        </filter>
        <path id="path0_fill" d="M 76.6154 0.379577L 38.4239 62.7753L 0 0L 11.1549 0L 23.2908 0L 38.3077 26.8582L 53.3246 0.379577L 64.4842 0.379577L 76.6154 0.379577Z"></path>
        <path id="path1_fill" d="M 53.3293 0.379577L 27.1528 45.6163L 0 0L 12.1359 0L 27.1528 26.8582L 42.1697 0.379577L 53.3293 0.379577Z"></path>
      </defs>
    </svg>
    </a>
    <h1><a href="/">VueInst</a></h1>
  </div>
</template>
<script>
export default {
  name: 'logo',
  props: ['main', 'fixed']
}
</script>
<style scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo a {
  line-height: 100%;
}
.logo:not(.mainLogo) {
  width: 100%;
  margin-bottom: 20px;
}
.logo.fixed h1 {
  opacity: 0;
}
.logo.fixed svg {
  width: 40px;
}
.mainLogo h1 {
  position: relative;
  font-size: 28px;
  padding-top: 11px;
  padding-bottom: 11px;
  font-family: 'Vollkorn', serif;
  margin-left: 20px;
  font-weight: lighter;
  transition: all .2s;
}
.logo h1 a {
  color: inherit;
  font-size: inherit;
  text-decoration: none;
}
.mainLogo h1::before {
  position: absolute;
  top: 10%;
  left: -23px;
  content: '';
  display: block;
  background-color: #317D51;
  width: 1px;
  height: 80%;
}
.mainLogo svg {
  width: 50px;
  height: 100%;
  margin-right: 10px;
}
svg {
  width: 80px;
  transition: all .2s;
}
h1 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: Vollkorn;
  font-size: 50px;
  font-weight: bold;
  color: #000;
}
</style>

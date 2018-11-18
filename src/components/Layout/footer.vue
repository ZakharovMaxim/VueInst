<template>
  <footer class='content'>
    <span>VUEINST 2018</span>
    <ul class="footer_nav">
      <li class="footer_item">БЛОГ</li>
      <li class="footer_item">О НАС</li>
      <li class="footer_item">ПОДДЕРЖКА</li>
      <li class="footer_item">КОНТАКТЫ</li>
    </ul>
  </footer>
</template>
<script>
export default {
  name: 'footerVue'
}
</script>
<style>
  footer {
  flex: 0 0 auto;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
footer span, .footer_nav li {
  font-weight: bold;
  font-size: 14px;
  color:#828282;
  text-transform: uppercase;
}
.footer_nav {
  display: flex;
}
.footer_nav li {
  list-style: none;
  margin-right: 50px;
}
.footer_nav li:last-child {
  margin-right: 0;
}
</style>

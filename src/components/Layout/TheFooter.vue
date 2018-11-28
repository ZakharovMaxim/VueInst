<template>
  <footer class='content'>
    <span>VUEINST 2018</span>
    <ul class='footer_nav'>
      <li>БЛОГ</li>
      <li>О НАС</li>
      <li>ПОДДЕРЖКА</li>
      <li>КОНТАКТЫ</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
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
.footer_nav a {
  text-decoration: none;
  color: inherit;
}
.footer_nav li:last-child {
  margin-right: 0;
}
@media screen and (max-width: 580px) {
  .footer_nav li {
    margin-right: 20px;
  }
}
@media screen and (max-width: 450px) {
  footer {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="user_properties">
    <p><span class='user_properties__value'>{{ posts }}</span> публикаций</p>
    <p :class='{active: subscribers}' @click='open("subscribers")'><span class='user_properties__value'>{{ subscribers }}</span> смотрят</p>
    <p :class='{active: subscribes}' @click='open("subscribes")'><span class='user_properties__value'>{{ subscribes }}</span> просматриваемых</p>
  </div>
</template>
<script>
export default {
  name: 'user-properties',
  props: {
    posts: {
      type: Number,
      default: 0
    },
    subscribers: {
      type: Number,
      default: 0
    },
    subscribes: {
      type: Number,
      default: 0
    }
  },
  methods: {
    open (type) {
      if (!this[type]) return
      this.$router.push(this.$route.path + '/' + type)
    }
  }
}
</script>

<style scoped>
.user_properties {
  margin-top: 14px;
  display: flex;
}
.user_properties p {
  color: black;
  font-size: 13px;
  font-weight: 300;
  text-decoration: none;
}
.user_properties p.active {
  cursor: pointer;
}
.user_properties span {
  font-weight: bold;
  font-size: 14px;
}

.user_properties p:nth-child(2) {
  position: relative;
  margin-right: 13px;
  margin-left: 23px;
}
.user_properties p:nth-child(2)::before {
  position: absolute;
  top:0;
  left:-9px;
  content: '';
  display: block;
  background-color: #BDBDBD;
  width: 1px;
  height: 20px;
}
.user_properties p:nth-child(2)::after {
  position: absolute;
  top:0;
  right:-9px;
  content: '';
  display: block;
  background-color: #BDBDBD;
  width: 1px;
  height: 20px;
}
</style>

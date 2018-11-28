<template>
  <div class='tabs'>
    <div class='tabs-header'>
      <ul>
        <li :class='{active: current === 1}' @click='change(1)'>Настройки пользователя</li>
        <li :class='{active: current === 2}' @click='change(2)'>Сменить пароль</li>
      </ul>
    </div>
    <div class='tabs-content'>
      <div class='tab' v-if='current === 1'>
        <changeInfoMainForm :user='user' />
      </div>
      <div class='tab' v-if='current === 2'>
        <changeInfoPasswordForm />
      </div>
    </div>
  </div>
</template>
<script>
import changeInfoPasswordForm from '../ChangeInfo/ChangeInfoPasswordForm'
import changeInfoMainForm from '../ChangeInfo/ChangeInfoMainForm'
export default {
  name: 'BaseTabs',
  data () {
    return {
      current: 1
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    change (n) {
      this.current = n
    }
  },
  components: { changeInfoPasswordForm, changeInfoMainForm }
}
</script>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #DEDCDC;
  border-radius: 3px;
  margin-top: 50px;
}
.tabs-header {
  border-right: 1px solid #DEDCDC;
  width: 30%;
}
.tabs-header li {
  padding: 16px 22px 16px 29px;
  position: relative;
  list-style: none;
  font-size: 15px;
  cursor: pointer;
}
.tabs-header li.active {
  font-weight: bold;
}
.tabs-header li.active:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 100%;
  width: 1.5px;
  background: #242424;
}
.tabs-content {
  width: 70%;
}
.tab {
  padding: 20px;
}
@media screen and (max-width: 650px) {
  .tabs {
    flex-direction: column;
  }
  .tabs-header, .tabs-content {
    width: 100%;
  }
}
</style>

<template>
  <section class="no_login_container">
    <img src="../../assets/person.png">
    <h3>登录后可查看外卖订单</h3>
    <van-button
      type="success"
      @click="go_login"
    >
      去登录
    </van-button>
  </section>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Button } from 'vant';
import { go_login } from 'utils/base';
export default defineComponent({
  name: 'NoLogin',
  components: {
    [Button.name]: Button,
  },
  setup(){
    return {
      go_login,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

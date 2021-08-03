<template>
  <div class="not-found">
    <p>404</p>
    <img
      src="./assets/404.jpeg"
      alt="404"
    >
    页面不存在
  </div>
  <van-button
    to="/home"
    type="success"
    class="btn"
  >
    回到首页
  </van-button>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Button } from 'vant';

export default defineComponent({
  name: 'NotFound',
  components: {
    [Button.name]: Button,
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

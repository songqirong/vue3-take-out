<template>
  <section class="user_agree_container">
    <van-nav-bar
      title="注册协议"
    />
    <h3>《用户服务协议书》</h3>
    <p>
      凡是在本网站注册登录的用户，本网站不会泄露任何一个用户的隐私，如果您同意了此协议，代表您愿意我们收录您的信息。
      再者以上只是我个人所建立的项目网站，并不具备任何能够交易的功能，此站收录的全不是真实的商品信息，本网站所有解释权均归本人所有，请知悉!
    </p>
  </section>
</template>
<script lang="ts" >
import { NavBar } from 'vant';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'UserAgree',
  components: {
    [NavBar.name]: NavBar,
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

<template>
  <section class="cart_container">
    <van-nav-bar
      title="订单"
    />
    <no-login v-if="!userInfo._id" />
    <had-login v-else />
  </section>
</template>
<script lang="ts" >
import { computed, defineComponent } from 'vue';
import { NavBar } from 'vant';
import NoLogin from './components/no-login/index.vue';
import HadLogin from './components/had-login/index.vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Cart',
  components: {
    [NavBar.name]: NavBar,
    NoLogin,
    HadLogin,
  },
  setup(){
    const store = useStore();
    const userInfo = computed<IUserInfo>(() => store.state.user.userInfo);
    return {
      userInfo,
    };

  },
});
</script>
<style lang="scss" scoped >
</style>

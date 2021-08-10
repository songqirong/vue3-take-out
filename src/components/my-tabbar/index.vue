<template>
  <van-tabbar
    route
    fixed
  >
    <van-tabbar-item
      v-for="item in tabs"
      :key="item.name"
      replace
      :to="item.path"
      :icon="item.icon"
      :dot="item.dot"
      :badge="item.badge"
    >
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Tabbar, TabbarItem } from 'vant';
export default defineComponent({
  name: 'MyTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup(){
    const tabs = [
      {
        name: '首页',
        path: '/home',
        icon: 'home-o',
        dot: false,
        badge: undefined,
      },
      {
        name: '查询',
        path: '/search',
        icon: 'search',
        dot: false,
        badge: undefined,
      },
      {
        name: '订单',
        path: '/cart',
        icon: 'shopping-cart-o',
        dot: false,
        badge: undefined,
      },
      {
        name: '个人中心',
        path: '/my',
        icon: 'setting-o',
        dot: true,
        badge: undefined,
      },
    ];
    return {
      tabs,
    };

  },
});
</script>
<style lang="scss" scoped >
</style>

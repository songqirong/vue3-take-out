<template>
  <div class="home-container">
    <van-nav-bar
      title="首页"
      fixed
      :right-text="userInfo._id ? userInfo.nickname : '登录｜注册'"
      @click-left="jump_to_page('/address')"
      @click-right="go_login"
    >
      <template #left>
        <van-icon name="location-o" />
        <span class="van-nav-bar__text">{{ home.positionInfo?.addressComponent?.city }}</span>
      </template>
      <template #title>
        <div
          class="search"
          @click="jump_to_page('/search')"
        >
          <van-icon
            name="search"
            color="#666"
          /> <span>请输入商家名、商圈或者商品名</span>
        </div>
      </template>
    </van-nav-bar>
    <cate-component :categories="home.categories" />
    <shop-component :shops="home.shops" />
  </div>
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted } from 'vue';
import { Button, NoticeBar, NavBar, Icon, Image, Toast } from 'vant';
import { useStore } from 'vuex';
import CateComponent from './components/categories/index.vue';
import ShopComponent from './components/shops/index.vue';
import { go_login, jump_to_page } from 'utils/base';
export default defineComponent({
  name: 'Home',
  components: {
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Image.name]: Image,
    CateComponent,
    ShopComponent,
  },
  setup(){
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const home = computed(() => store.state.home);
    const handleClick = () => {
      store.commit('home/add');
    };
    onMounted(() => {
      // 获取坐标并反解析地理位置
      store.dispatch('home/fetchPositionInfo');
      store.dispatch('home/fetchShops');
      store.dispatch('home/fetchAllGories');
    });
    return {
      handleClick,
      go_login,
      jump_to_page,
      home,
      userInfo,
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

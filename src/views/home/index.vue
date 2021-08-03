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
        <span class="van-nav-bar__text">{{ city }}</span>
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
    <cate-component :categories="categories" />
    <shop-component :shops="shops" />
  </div>
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue';
import { Button, NoticeBar, NavBar, Icon, Image } from 'vant';
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
    const categories = computed(() => store.state.home.categories);
    const shops = computed(() => store.state.home.shops);
    const userInfo = computed(() => store.state.user.userInfo);
    const handleClick = () => {
      store.commit('home/add');
    };

    const state = reactive({
      city: '深圳',
    });

    onMounted(() => {
      // if(navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition(async function(position){
      //     //经度
      //     const longitude = position.coords.longitude;
      //     //纬度
      //     const latitude = position.coords.latitude;

      //     const res = await http.getLocation(latitude, longitude);
      //     state.city = res.data.data.addressComponent.city;
      //   }), function(error){
      //     console.log(error, 'err');
      //   }, {
      //     enableHighAccuracy: true,
      //     maximumAge: 75000,
      //     timeout: 30000,
      //   };
      // } else {
      //   Toast('当前浏览器不支持定位');
      // }
      // vuex里有数据则不需要请求
      categories.value.length === 0 && store.dispatch('home/fetchAllGories');
      shops.value.length === 0 && store.dispatch('home/fetchShops');
    });
    return {
      handleClick,
      go_login,
      jump_to_page,
      categories,
      shops,
      userInfo,
      ...toRefs(state),
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

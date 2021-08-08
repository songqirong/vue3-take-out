<template>
  <section class="shop_container">
    <header :style="{ backgroundImage: `url(${info.bgImg})` }">
      <van-icon
        name="arrow-left"
        @click="go_back"
      />
      <div class="logo">
        <van-image
          :src="info.avatar"
        />
      </div>
    </header>
    <main>
      <h4>
        <van-tag
          color="#FFEA0D"
          text-color="#715000"
        >
          品牌
        </van-tag>
        {{ info.name }}<van-icon
          name="play"
          @click="openModal('show')"
        />
      </h4>
      <p>{{ info.score }} 月售{{ info.sellCount }}单 {{ info.description }} 约{{ info.deliveryTime }}分钟 距离{{ info.distance }}</p>
    </main>
    <footer
      v-if="info.supports?.length > 0"
      @click="openModal('preShow')"
    >
      <van-tag
        type="success"
      >
        {{ info.supports[0].name }}
      </van-tag><i>{{ info.supports[0].content }}</i> {{ info.supports?.length }}个优惠
      <van-icon :name="preShow ? 'arrow' : 'arrow-down'" />
    </footer>
  </section>
  <van-tabs
    v-model:active="active"
    sticky
  >
    <van-tab
      v-for="item in tabList"
      :key="item.title"
      :to="item.path"
      :title="item.title"
      :name="item.path"
      replace
    />
  </van-tabs>
  <!-- 二级路由展示 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <shop-deatil v-model:show.sync="show" />
  <preferential v-model:show.sync="preShow" />
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue';
import { Icon, Tab, Tabs, Image, Tag } from 'vant';
import { useStore } from 'vuex';
import ShopDeatil from './components/shop-detail/index.vue';
import Preferential from './components/preferential/index.vue';
import { go_back } from 'utils/base';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Shop',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Tag.name]: Tag,
    ShopDeatil,
    Preferential,
  },
  setup(){
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      active: route.path,
      show: false,
      preShow: false,
    });
    const info = computed(() => store.state.shop.info);
    console.log(info, 'info');
    const tabList = [
      { path: '/shop/goods', title: '点餐' },
      { path: '/shop/ratings', title: '评价' },
      { path: '/shop/info', title: '商家' },
    ];
    const openModal = (type) => {
      state[type] = true;
    };
    onMounted(() => {
      store.dispatch('shop/fetchShopInfo');
    });
    return {
      tabList,
      info,
      go_back,
      openModal,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

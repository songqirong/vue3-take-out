<template>
  <section class="shops">
    <div class="shop_header">
      <van-icon name="bars" />
      <span class="shop_header_title">附近商家</span>
    </div>
    <van-pull-refresh
      v-if="shops.length"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <dl
          v-for="item in shops"
          :key="item.id"
          class="shop-item"
          @click="jump_to_page('/shop')"
        >
          <dt class="img_box">
            <van-image
              src="https://static.persion.cn/images/categories/pizza-burgers.png"
              fit="cover"
              lazy-load
              :alt="item.name"
            />
          </dt>
          <dd class="content">
            <header class="title">
              <span
                v-show="item.is_premium"
                class="tag"
              >品牌</span>
              <b>{{ item.name }}</b>
            </header>
            <main class="main">
              <van-rate
                v-model="item.rating"
                readonly
                allow-half
              />
              <span class="rating">{{ item.rating }}</span>
              <i class="num">{{ `月售${item.recent_order_num}单` }}</i>
            </main>
            <footer class="desc">
              <span>{{ `${item.float_minimum_order_amount}起配送 / 配送费约¥${item.float_delivery_fee}` }}</span>
            </footer>
          </dd>
          <div class="desc">
            <ul>
              <li
                v-for="value in item.supports"
                :key="value.id"
              >
                {{ value.icon_name }}
              </li>
            </ul>
            <p>{{ item.delivery_mode.text }}</p>
          </div>
        </dl>
      </van-list>
    </van-pull-refresh>
    <ul v-else>
      <li
        v-for="item in 6"
        :key="item"
      >
        <img
          src="../../assets/shop_back.svg"
          alt="back"
        >
      </li>
    </ul>
  </section>
</template>
<script lang="ts" >
import { defineComponent, reactive, toRefs } from 'vue';
import { PullRefresh, List, Icon, Image, Rate } from 'vant';
import { jump_to_page } from 'utils/base';

export default defineComponent({
  name: 'ShopComponent',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Rate.name]: Rate,
  },
  props: {
    shops: {
      type: Object,
      required: true,
    },
  },
  setup(){
    const state = reactive({
      refreshing: false, // 是否处于刷新中
      loading: false, // 是否处于加载中
      finished: true, // 是否已加载完成
    });

    // 触底加载
    const onLoad = () => {
      console.log('触底了');
    };

    // 下拉刷新
    const onRefresh = () => {
      console.log('下拉刷新了');
    };
    return {
      ...toRefs(state),
      onLoad,
      onRefresh,
      jump_to_page,
    };
  },
});
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>

<template>
  <section class="search_container">
    <van-nav-bar
      title="搜索"
    />
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @clear="onClear"
    >
      <template #action>
        <div
          class="search_action"
          @click="onSearch"
        >
          搜索
        </div>
      </template>
      <template #label>
        <div
          class="label"
        >
          店铺
        </div>
      </template>
    </van-search>
    <ul
      v-if="searchShop.length > 0"
      class="search_shop"
    >
      <li
        v-for="item in searchShop"
        :key="item.id"
      >
        <dl>
          <dt>
            <van-image
              src="https://static.persion.cn/images/categories/pizza-burgers.png"
              fit="cover"
              lazy-load
              :alt="item.name"
            />
          </dt>
          <dd>
            <h3>{{ item.name }}</h3>
            <h4>月售{{ item.recent_order_num }}单</h4>
            <p>{{ item.float_minimum_order_amount }}元起送/距离{{ item.distance }}</p>
          </dd>
        </dl>
      </li>
    </ul>
    <!-- 热门搜索 -->
    <hot-search
      v-else-if="hotShow"
      @search="clickSearch"
    />
    <van-empty
      v-show="isNone"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="没有搜索到哦，换个搜索词试试～"
    />
    <van-loading
      v-show="loading"
      type="spinner"
    />
  </section>
</template>
<script lang="ts" >
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { Empty, Image, Loading, NavBar, Search, Toast } from 'vant';
import HotSearch from './components/hot-search/index.vue';
import { useStore } from 'vuex';
interface IState{
  keyword: string;
  isNone: boolean;
  loading: boolean;
  hotShow: boolean;
}
export default defineComponent({
  name: 'Search',
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Empty.name]: Empty,
    [Image.name]: Image,
    [Loading.name]: Loading,
    HotSearch,
  },
  setup(){
    const store = useStore();
    const state = reactive<IState>({
      keyword: '',
      isNone: false,
      loading: false,
      hotShow: true, //控制热门提示的显示隐藏
    });
    const searchShop = computed(() => store.state.shop.searchShop);
    const positionInfo = computed(() => store.state.home.positionInfo);

    // 搜索事件
    const onSearch = () => {
      if(state.keyword.trim() === ''){
        Toast('请先输入关键词～');
        return;
      }
      state.isNone = false;
      state.loading = true;
      state.hotShow = false;
      store.dispatch('shop/fetchSearchShops', { keyword: state.keyword, ...positionInfo.value.location });
    };

    // 子元素的点击搜索事件
    const clickSearch = (val) => {
      state.keyword = val;
      onSearch();
    };

    // 清除事件
    const onClear = () => {
      // 先清除vuex中searchShop列表
      store.commit('shop/updateSearchShop', []);
      // 显示热门搜索
      state.hotShow = true;
    };

    watch(searchShop, () => {
      state.loading = false;
      state.isNone = searchShop.value.length === 0 && !state.hotShow;
    });
    return {
      ...toRefs(state),
      searchShop,
      onSearch,
      onClear,
      clickSearch,
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

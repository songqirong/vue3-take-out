<template>
  <div class="shop_goods_container">
    <nav>
      <van-sidebar
        v-model="active"
        @change="onChange"
      >
        <van-sidebar-item
          v-for="(item, index) in goods"
          :key="index"
          :badge="badgeList[item.name]"
        >
          <template #title>
            <span class="title-icon">
              <van-icon
                v-if="item.icon"
                :name="item.icon"
              /> {{ item.name }}
            </span>
          </template>
        </van-sidebar-item>
      </van-sidebar>
    </nav>
    <main>
      <div class="index-bar-box">
        <van-index-bar
          ref="indexBar"
          :index-list="indexList"
          :sticky="false"
          @change="indexChange"
        >
          <div
            v-for="item in goods"
            :key="item._id"
            class="item"
          >
            <van-index-anchor :index="item.name">
              {{ item.name }}
            </van-index-anchor>
            <ul>
              <li
                v-for="food in item.foods"
                :key="food._id"
              >
                <div>
                  <van-image
                    lazy-load
                    :src="food.image"
                    :alt="food.name"
                    @click="preViewImage(food.images)"
                  />
                </div>
                <div>
                  <h3>{{ food.name }}</h3>
                  <h4>{{ food.description }}</h4>
                  <p>月售{{ food.sellCount }}份  好评率{{ food.rating }}%</p>
                  <div>
                    <span>¥{{ food.price }}</span>
                    <div
                      v-if="Object.prototype.hasOwnProperty.call(buyList, food.name)"
                      class="oprate"
                    >
                      <oprate-num
                        :id="food._id"
                        :cate="item.name"
                        :name="food.name"
                        :price="food.price"
                        :value="buyList[food.name].count"
                      />
                    </div>
                    <van-icon
                      v-else
                      name="add"
                      color="#1E9B84"
                      @click="changeNum('add', food.name, food.price, item.name, food._id)"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-index-bar>
      </div>
    </main>
    <footer>
      <shop-cart />
    </footer>
  </div>
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, reactive, toRefs, ref, watch } from 'vue';
import { Badge, Icon, Image, ImagePreview, IndexAnchor, IndexBar, Sidebar, SidebarItem, Stepper } from 'vant';
import { useStore } from 'vuex';
import ShopCart from 'src/views/shop/components/shop-cart/index.vue';
import OprateNum from 'src/views/shop/components/oprate-num/index.vue';
type IState = {
  active: number;
  indexList: string[];
}
export default defineComponent({
  name: 'ShopGoods',
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [IndexAnchor.name]: IndexAnchor,
    [IndexBar.name]: IndexBar,
    [Image.name]: Image,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Badge.name]: Badge,
    ShopCart,
    OprateNum,
  },
  setup(){
    const state = reactive<IState>({
      active: 0,
      indexList: [],
    });
    const indexBar = ref();
    const store = useStore();
    const goods = computed(() => store.state.shop.goods);
    const buyList = computed(() => store.state.shop.buyList);
    const badgeList = computed(() => store.state.shop.badgeList);
    watch(goods, () => {
      state.indexList = goods.value.map((item) => item.name);
    });
    onMounted(async() => {
      store.dispatch('shop/fetchShopGoods');
    });

    // 点击侧边栏的tab改变事件,滚动至相应位置
    const onChange = (i) => {
      indexBar.value.scrollTo(state.indexList[i]);
    };

    // 点击stepper事件
    const changeNum = (type: 'reduce' | 'add', name: string, price: number, cate: string, id: string) => {
      store.commit('shop/updateList', { type, name, price, cate, id });
    };

    // 预览图片
    const preViewImage = (images) => {
      ImagePreview({
        images,
        closeable: true,
      });
    };


    // 滑动事件改变侧边栏tab
    const indexChange = (i) => {
      state.active = state.indexList.indexOf(i as never);
    };
    return {
      ...toRefs(state),
      goods,
      buyList,
      indexBar,
      badgeList,
      onChange,
      changeNum,
      indexChange,
      preViewImage,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

<template>
  <div class="shop_cart_popup">
    <van-popup
      v-model:show="isShow"
      position="bottom"
      safe-area-inset-bottom
      :overlay-style="{zIndex: 200}"
      lazy-render
      @close="close"
    >
      <div class="top">
        购物车 <span @click="clear">清空</span>
      </div>
      <ul>
        <li
          v-for="item in buyList"
          :key="item.id"
        >
          <p>{{ item.name }}</p><span>¥{{ item.price }}</span><h4>
            <oprate-num
              :id="item.id"
              :price="item.price"
              :name="item.name"
              :cate="item.cate"
              :value="item.count"
            />
          </h4>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script lang="ts" >
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { Popup } from 'vant';
import { useStore } from 'vuex';
import OprateNum from 'src/views/shop/components/oprate-num/index.vue';
interface IState{
  isShow: boolean;
}
export default defineComponent({
  name: 'ShopCartPopup',
  components: {
    [Popup.name]: Popup,
    OprateNum,
  },
  props: {
    show: { type: Boolean, required: true },
  },
  emits: ['update:show'],
  setup(props, context){
    const state = reactive<IState>({
      isShow: props.show,
    });
    watch(() => props.show, () => { state.isShow = props.show; });

    const store = useStore();

    // 关闭更新父组件的状态
    const close = () => {
      context.emit('update:show', false);
    };

    const buyList = computed(() => {
      const list = store.state.shop.buyList;
      const arr: any[] = [];
      for(const key in list){
        arr.push({ name: key, ...list[key] });
      }
      return arr;
    });

    // 监听购物车数量
    watch(buyList, () => {
      if(buyList.value.length <= 0 ){
        state.isShow = false;
        close();
      }
    });

    // 清空购物车
    const clear = () => {
      store.commit('shop/clearBuyList');
    };
    return {
      buyList,
      ...toRefs(state),
      close,
      clear,
    };
  },

});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

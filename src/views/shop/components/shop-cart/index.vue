<template>
  <div class="shop_cart">
    <div>
      <div class="cart">
        <van-icon
          name="shopping-cart"
          color="green"
          :badge="shop.totalBuy || undefined"
          @click="togglePop"
        />
      </div>
      <div class="dollar">
        ¥{{ shop.totalPrice }} <p>配送费：¥{{ shop.info.deliveryPrice }}元</p>
      </div>
      <van-button
        :color=" payText === '去结算' ? '#01A742' : '#303A47' "
        @click="settlement"
      >
        {{ payText }}
      </van-button>
    </div>
  </div>
  <shop-cart-popup v-model:show.sync="show" />
</template>
<script lang="ts" >
import { Badge, Button, Icon, Popup, Toast } from 'vant';
import { defineComponent, computed, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import ShopCartPopup from 'src/views/shop/components/shop-cart-popup/index.vue';
export default defineComponent({
  name: 'ShopCart',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Badge.name]: Badge,
    [Popup.name]: Popup,
    ShopCartPopup,
  },

  setup(props, context){
    const state = reactive({
      show: false,
    });
    const store = useStore();
    const shop = computed(() => store.state.shop);
    const isCanOpen = computed(() => Object.keys(store.state.shop.buyList).length > 0);
    const payText = computed(() => {
      const { shop: { totalPrice: value, info: { minPrice: min } } } = store.state;
      if(value === 0) {
        return `￥${min || 0}元起送`;
      } else if(value < min) {
        return `还差￥${min - value}元起送`;
      } else {
        return '去结算';
      }
    });
    // 点击去结算
    const settlement = () => {
      if(payText.value !== '去结算') return Toast('未达起送金额～');
      store.commit('shop/clearBuyList');
      Toast.success('结算成功');
    };
    const togglePop = () => {
      if(!isCanOpen.value) return Toast('购物车暂无商品信息');
      state.show = !state.show;
    };
    return {
      ...toRefs(state),
      shop,
      payText,
      togglePop,
      settlement,
    };
  },

});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

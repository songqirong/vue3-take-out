<template>
  <div class="shop_detail_popup">
    <van-popup
      v-model:show="isShow"
      closeable
      :close-on-click-overlay="false"
      round
      @close="close"
    >
      <div class="main">
        <header>
          <van-tag
            color="#FFEA0D"
            text-color="#715000"
          >
            品牌
          </van-tag>{{ info.name }}
        </header>
        <main>
          <ul>
            <li>
              <h3>{{ info.score }}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{ `${info.sellCount}单` }}</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{ info.description }}</h3>
              <p>{{ `约${info.deliveryTime}分钟` }}</p>
            </li>
            <li>
              <h3>{{ `${info.deliveryPrice}元` }}</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{ info.distance }}</h3>
              <p>距离</p>
            </li>
          </ul>
        </main>
        <van-divider>公告</van-divider>
        <footer>
          {{ info.bulletin }}
        </footer>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts" >
import { defineComponent, computed, reactive, toRefs, watch, ref } from 'vue';
import { Divider, Icon, Popup, Tag } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'ShopDetail',
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Divider.name]: Divider,
  },
  props: {
    show: { type: Boolean, required: true },
  },
  emits: ['update:show'],
  setup(props, context){
    const state = reactive({
      isShow: props.show,
    });
    watch(() => props.show, () => { state.isShow = props.show; });
    const store = useStore();
    const info = computed(() => store.state.shop.info);
    // 关闭更新父组件的状态
    const close = () => {
      context.emit('update:show', false);
    };
    return {
      info,
      ...toRefs(state),
      close,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

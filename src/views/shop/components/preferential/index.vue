<template>
  <div class="preferential_popup">
    <van-popup
      v-model:show="isShow"
      safe-area-inset-bottom
      closeable
      :close-on-click-overlay="false"
      round
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    >
      <div class="main">
        <header>
          <van-divider>优惠活动</van-divider>
        </header>
        <main>
          <ul>
            <li
              v-for="(item, index) in info.supports"
              :key="index"
            >
              <van-tag
                :type="typeMap[item.name]"
              >
                {{ item.name }}
              </van-tag><i>{{ item.content }}</i>
            </li>
          </ul>
        </main>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts" >
import { defineComponent, computed, reactive, toRefs, watch, ref } from 'vue';
import { Divider, Popup, Tag } from 'vant';
import { useStore } from 'vuex';
enum typeMap{
  '首单' = 'success',
  '满减' = 'danger',
  '特价' = 'warning'
}
export default defineComponent({
  name: 'Preferential',
  components: {
    [Popup.name]: Popup,
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
      typeMap,
      ...toRefs(state),
      close,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

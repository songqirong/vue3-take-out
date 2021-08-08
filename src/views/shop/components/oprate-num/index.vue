<template>
  <div class="oprate_num">
    <van-stepper
      v-model="val"
      theme="round"
      disable-input
      :min="0"
      @plus="() => {changeNum('add')}"
      @minus="() => {changeNum('reduce')}"
    />
  </div>
</template>
<script lang="ts" >
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { Stepper } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'OprateNum',
  components: {
    [Stepper.name]: Stepper,
  },
  props: {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cate: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props){
    const state = reactive({
      val: props.value,
    });
    watch(() => props.value, () => {
      state.val = props.value;
    });
    const store = useStore();
    const changeNum = (type: 'reduce' | 'add') => {
      store.commit('shop/updateList', { type, ...props });
    };
    return {
      ...toRefs(state),
      changeNum,
    };
  },

});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

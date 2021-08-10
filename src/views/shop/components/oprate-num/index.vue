<template>
  <div class="oprate_num">
    <div class="reduce">
      <van-icon
        name="minus"
        @click="changeNum('reduce')"
      />
    </div>
    <span>{{ value }}</span>
    <div
      class="add"
      @click="changeNum('add')"
    >
      <van-icon name="plus" />
    </div>
  </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Icon } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'OprateNum',
  components: {
    [Icon.name]: Icon,
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
    id: {
      type: String,
      required: true,
    },
  },
  setup(props){
    const store = useStore();
    const changeNum = (type: 'reduce' | 'add') => {
      store.commit('shop/updateList', { type, ...props });
    };
    return {
      changeNum,
    };
  },

});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

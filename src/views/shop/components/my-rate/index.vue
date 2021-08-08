<template>
  <dl class="rate">
    <dt>
      <h3>{{ info.score }}</h3>
      <h4>综合评分</h4>
      <p>高于周边商家{{ info.rankRate }}%</p>
    </dt>
    <dd>
      <h3>
        服务评分：<van-rate
          v-model="info.serviceScore"
          readonly
          allow-half
          color="#FFBA3B"
        />
      </h3>
      <h4>
        商品评分：<van-rate
          v-model="info.foodScore"
          readonly
          allow-half
          color="#FFBA3B"
        />
      </h4>
      <p>送达时间： <span>{{ info.deliveryTime }}分钟</span> </p>
    </dd>
  </dl>
</template>
<script lang="ts" >
import { computed, defineComponent } from 'vue';
import { Rate } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'MyRate',
  components: {
    [Rate.name]: Rate,
  },
  setup(){
    const store = useStore();
    const info = computed(() => store.state.shop.info);
    return {
      info,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

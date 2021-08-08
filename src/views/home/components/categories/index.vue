<template>
  <section class="categories">
    <van-swipe
      v-if="categories.length"
      :loop="false"
    >
      <van-swipe-item
        v-for="(item, index) in categories"
        :key="index"
      >
        <van-grid
          :gutter="10"
          :border="false"
        >
          <van-grid-item
            v-for="value in item"
            :key="value._id"
            :icon="value.image_url"
            :text="value.cate_zh"
            @click="tips"
          />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <img
      v-else
      src="../../assets/msite_back.svg"
      alt="back"
    >
  </section>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Swipe, SwipeItem, Grid, GridItem } from 'vant';
import { tips } from 'utils/base';

export default defineComponent({
  name: 'CateComponent',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  props: {
    categories: {
      type: Object,
      required: true,
    },
  },
  setup(){
    return {
      tips,
    };
  },
});
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>

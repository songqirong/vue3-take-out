<template>
  <div class="shop_ratings_container">
    <my-rate />
    <div class="seprate" />
    <comments />
  </div>
</template>
<script lang="ts" >
import { defineComponent, onMounted } from 'vue';
import MyRate from 'src/views/shop/components/my-rate/index.vue';
import Comments from 'src/views/shop/components/comments/index.vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'ShopRatings',
  components: {
    MyRate,
    Comments,
  },
  setup(){
    const store = useStore();
    onMounted(async() => {
      store.dispatch('shop/fetchShopRatings');
    });
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

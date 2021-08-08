<template>
  <div class="shop_ratings_container">
    <my-rate />
    <div class="seprate" />
    <comments />
  </div>
</template>
<script lang="ts" >
import { computed, defineComponent, onMounted } from 'vue';
import MyRate from '../../components/my-rate/index.vue';
import Comments from '../../components/comments/index.vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'ShopRatings',
  components: {
    MyRate,
    Comments,
  },
  setup(){
    const store = useStore();
    const ratings = computed(() => store.state.shop.ratings);
    console.log(ratings, 'ratings');
    onMounted(async() => {
      store.dispatch('shop/fetchShopRatings');
    });
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

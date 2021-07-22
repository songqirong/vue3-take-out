<template>
  <div class="home-container">
    首页
  </div>
  <h2>{{ count }}</h2>
  <button @click="handleClick">
    加
  </button>
  <van-button type="primary">
    减少
  </van-button>
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, getCurrentInstance } from 'vue';
import { Button } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Home',
  components: {
    [Button.name]: Button,
  },
  setup(){
    const store = useStore();
    const count = computed(() => store.state.home.count);
    const handleClick = () => {
      store.commit('home/add');
    };
    onMounted(() => {
      const { getUserInfo } = (getCurrentInstance()?.proxy as any).$http;
      getUserInfo().then((res:any) => {
        console.log(res, 'res');
      });
    });
    return {
      handleClick,
      count,
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

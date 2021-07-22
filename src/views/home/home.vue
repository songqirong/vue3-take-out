<template>
  <div class="home-container">
    首页
  </div>
  <h2>{{count}}</h2>
  <button @click="handleClick">加</button>
  <van-button type="primary">减少</van-button>
</template>
<script lang="ts" >
import { defineComponent, computed } from 'vue';
import { Button } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
 name: 'home',
 setup(){
   const store = useStore();
   const count = computed(() => store.state.home.count);
   const handleClick = () => {
     store.commit('home/add');
   }
   return {
     handleClick,
     count
   }
 },
 components: {
   [Button.name]: Button
 }
})
</script>
<style lang="scss">
  @import './index.scss';
</style>
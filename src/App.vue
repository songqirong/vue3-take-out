<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <my-tabbar v-show="TabsList.includes(route.path)" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import MyTabbar from 'components/my-tabbar/index.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    MyTabbar,
  },
  setup() {
    const store = useStore();
    // 显示tabbar的路由
    const route = useRoute();
    const TabsList = ['/home', '/search', '/my', '/cart'];
    onMounted(() => {
      store.dispatch('user/getUserInfo');
    });
    return {
      TabsList,
      route,
    };
  },
});
</script>

<style lang="scss">
@import 'src/assets/common.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;

}




</style>

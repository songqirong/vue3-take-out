<template>
  <router-view />
  <van-tabbar
    v-show="TabsList.includes(route.path)"
    route
    fixed
    active-color="#1E9B84"
  >
    <van-tabbar-item
      v-for="item in tabs"
      :key="item.name"
      replace
      :to="item.path"
      :icon="item.icon"
      :dot="item.dot"
      :badge="item.badge"
    >
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Tabbar, TabbarItem } from 'vant';
import { useRoute } from 'vue-router';
import { IUser } from 'store/modules/user/type';

export default defineComponent({
  name: 'App',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const route = useRoute();
    onMounted(() => {
      store.dispatch('user/getUserInfo');
    });
    const store = useStore();
    // 显示tabbar的路由
    const TabsList = ['/home', '/search', '/my', '/friends'];
    const tabs = [
      {
        name: '首页',
        path: '/home',
        icon: 'home-o',
        dot: true,
        badge: undefined,
      },
      {
        name: '查询',
        path: '/search',
        icon: 'search',
        dot: false,
        badge: undefined,
      },
      {
        name: '联系',
        path: '/friends',
        icon: 'friends-o',
        dot: false,
        badge: 3,
      },
      {
        name: '个人中心',
        path: '/my',
        icon: 'setting-o',
        dot: false,
        badge: undefined,
      },
    ];
    const state = reactive({

    });
    return {
      ...toRefs(state),
      tabs,
      TabsList,
      route,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* 更改tabbar样式 */
  .van-tabbar{
    height: 100px;
    .van-tabbar-item{
      font-size: 30px;
      .van-badge__wrapper{
        .van-icon{
          font-size: 40px;
        }
        .van-badge{
          margin-top: 10px;
          font-size: 16px;
          padding: 2px 10px;
        }
        .van-badge--dot{
          padding: 10px;
        }
      }
    }
  }

  /* tabbar全局样式 */
  .van-nav-bar__content{
    height: 80px;
    line-height: 80px;
    background-color: #1E9B84;
    .van-nav-bar__title{
      font-size: 40px;
      color: white;
      letter-spacing: 20px;
    }
    .van-nav-bar__left, .van-nav-bar__right{
      font-size: 30px;
      .van-nav-bar__text{
        color: white;
      }
      .van-icon{
        color: white;
        font-size: 30px
      }
    }
  };

}
body{
  margin: 0;
}

/* 更改toast全局样式 */
.van-popup{
  font-size: 20px !important;
  max-width: 200px !important;
  width: inherit !important;
}
.van-toast--text{
  max-width: 450px !important;
  padding: 20px 15px !important;
}


</style>

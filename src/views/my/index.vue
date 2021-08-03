<template>
  <section class="my_container">
    <van-nav-bar
      title="我的"
      fixed
    />
    <header>
      <van-image :src="userInfo.user_avatar" />
      <div class="desc">
        {{ userInfo.nickname }}
      </div>
    </header>
  </section>
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue';
import { Button, NavBar, NoticeBar, Toast, Image } from 'vant';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'My',
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
  },
  setup(){
    const store = useStore();
    const userInfo = computed<IUserInfo>(() => store.state.user.userInfo);
    const handleClick = () => {
      store.commit('home/add');
    };
    return {
      handleClick,
      userInfo,
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

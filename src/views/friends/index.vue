<template>
  <van-notice-bar
    left-icon="volume-o"
    text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    mode="closeable"
  />
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
  <div
    class="code"
    v-text="code"
  />
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, getCurrentInstance, reactive, toRefs } from 'vue';
import { Button, NoticeBar } from 'vant';
import { useStore } from 'vuex';
import { go_login } from 'utils/base';
export default defineComponent({
  name: 'Friends',
  components: {
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
  },
  setup(){
    const store = useStore();
    const count = computed(() => store.state.home.count);
    const handleClick = () => {
      store.commit('home/add');
    };

    const state = reactive({
      loginForm: {
        captcha: '',
      },
      code: '',
    });
    const renderCode = (length: any) => {
      let str = '';
      for(let i = 0; i < length; i++){
        str += Math.floor(Math.random() * 10);
      }
      state.code = str;
    };
    onMounted(() => {
      // const { getUserInfo } = (getCurrentInstance()?.proxy as any).$http;
      renderCode(6);
      go_login();
      // getUserInfo().then((res: any) => {
      //   console.log(res, 'res');
      // });
      // Toast({ duration: 2000000, message: '我去我去我去我我去' });
    });
    return {
      handleClick,
      count,
      ...toRefs(state),
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

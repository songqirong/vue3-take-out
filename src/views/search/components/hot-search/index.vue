<template>
  <section class="hot_search_container">
    <div class="title">
      <span>热门搜索</span><b
        @click="change"
        v-text="msg"
      />
    </div>
    <ul
      v-show="show"
      class="content"
    >
      <li
        v-for="(item,index) in searchList"
        :key="index"
        :class="{on:index<3}"
        @click="toSearch(item)"
        v-text="item"
      />
    </ul>
    <div
      v-show="!show"
      class="content2"
    >
      已隐藏搜索发现
    </div>
  </section>
</template>
<script lang="ts" >
import { defineComponent, reactive, toRefs } from 'vue';
interface IState{
  show: boolean;
  msg: string;
}
export default defineComponent({
  name: 'HotSearch',
  emits: ['search'],
  setup(props, context){
    const state = reactive<IState>({
      show: true,
      msg: '隐藏',
    });
    const searchList = ['蜜雪冰城', '周黑鸭', 'a', '披萨', '炸鸡', '肯德基', '麦当劳', '一点点奶茶', '奈雪', '耐克', '热水壶', '多功能沙发床'];
    const change = () => {
      if(state.show){
        state.msg = '显示';
      }else{
        state.msg = '隐藏';
      }

      state.show = !state.show;
    };
    const toSearch = (item) => {
      context.emit('search', item);
    };
    return {
      ...toRefs(state),
      searchList,
      change,
      toSearch,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

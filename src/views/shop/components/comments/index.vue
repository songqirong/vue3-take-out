<template>
  <section class="comments">
    <div class="comments-header">
      <van-button
        square
        type="success"
        :plain="active != 0"
        @click="changeActive(0)"
      >
        全部 {{ ratings.length }}
      </van-button>
      <van-button
        square
        type="success"
        :plain="active != 1"
        @click="changeActive(1)"
      >
        满意 {{ good }}
      </van-button>
      <van-button
        square
        type="success"
        :plain="active != 2"
        @click="changeActive(2)"
      >
        不满意 {{ ratings.length - good }}
      </van-button>
    </div>
    <div class="radio">
      <van-checkbox v-model="checked">
        只看有内容的评价
      </van-checkbox>
    </div>
    <ul class="comments-main">
      <li
        v-for="(item, index) in activeList"
        :key="index"
      >
        <dl>
          <dt>
            <van-image :src="item.avatar" />
          </dt>
          <dd>
            <h3>{{ item.username }} <span>{{ DateDealWith(item.rateTime) }}</span> </h3>
            <van-rate
              v-model="item.score"
              readonly
              allow-half
              color="#FFBA3B"
            />
            <p>{{ item.text }}</p>
            <div class="tag">
              <van-tag
                v-for="(value, idx) in item.recommend"
                :key="idx"
                plain
                type="primary"
              >
                {{ value }}
              </van-tag>
            </div>
          </dd>
        </dl>
      </li>
    </ul>
  </section>
</template>
<script lang="ts" >
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { Button, Checkbox, Image, Rate, Tag } from 'vant';
import { useStore } from 'vuex';
interface IState{
  active: number;
  activeList: any[];
  good: number;
  checked: boolean;
}
export default defineComponent({
  name: 'Comments',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Rate.name]: Rate,
    [Tag.name]: Tag,
    [Checkbox.name]: Checkbox,
  },
  setup(){
    const state = reactive<IState>({
      active: 0,
      activeList: [],
      good: 0,
      checked: true,
    });
    const store = useStore();
    const ratings = computed(() => store.state.shop.ratings);

    // 根据选择的评论类型来改变展示的数据
    watch( [() => state.active, ratings, () => state.checked], () => {
      // 先过滤出选择评论类型的评论
      const list = state.active > 0 ? ratings.value?.filter((item) => item.rateType === state.active - 1) : ratings.value;
      // 再过滤选择是否查看有实际内容
      state.activeList = state.checked ? list.filter((item) => !!item.text) : list;
    });

    // 计算出满意的评论数
    watch( ratings, () => {
      state.good = ratings.value.filter((item) => item.rateType === 0).length;
    });

    // 日期处理
    const DateDealWith = (time) => new Date(time).toLocaleDateString();

    // 改变选择的评论类型
    const changeActive = (i: number) => {
      state.active = i;
    };
    return {
      ratings,
      ...toRefs(state),
      changeActive,
      DateDealWith,
    };
  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

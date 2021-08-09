<template>
  <section class="shop_info_container">
    <div class="shop_info_header">
      <van-divider>配送信息</van-divider>
      <div class="desc">
        <p class="tag-box">
          <van-tag type="success">
            {{ info.description }}
          </van-tag>由商家配送提供配送，约{{ info.deliveryTime }}分钟送达，距离{{ info.distance }}
        </p>
        <div>配送费￥{{ info.deliveryPrice }}</div>
      </div>
    </div>
    <div class="seprate" />
    <div class="main">
      <header>
        <van-divider>活动与服务</van-divider>
      </header>
      <div class="main">
        <main>
          <ul>
            <li
              v-for="item in info.supports"
              :key="item._id"
            >
              <van-tag
                :type="typeMap[item.name]"
              >
                {{ item.name }}
              </van-tag><i>{{ item.content }}</i>
            </li>
          </ul>
        </main>
      </div>
    </div>
    <div class="seprate" />
    <div class="shop-live">
      <van-divider>商家实景</van-divider>
      <div class="live-box">
        <div>
          <van-image
            v-for="(item, index) in info.pics"
            :key="index"
            :src="item"
          />
        </div>
      </div>
    </div>
    <div class="shop-msg">
      <van-divider>商家信息</van-divider>
      <van-cell-group>
        <van-cell
          title="品类"
          :value="info.category"
        />
        <van-cell
          title="商家电话"
          :value="info.phone"
        />
        <van-cell
          title="地址"
          :value="info.address"
        />
        <van-cell
          title="营业时间"
          :value="info.workTime"
        />
      </van-cell-group>
    </div>
  </section>
</template>
<script lang="ts" >
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue';
import { Cell, CellGroup, Divider, Image, Tag } from 'vant';
import { useStore } from 'vuex';
enum typeMap{
  '首单' = 'success',
  '满减' = 'danger',
  '特价' = 'warning'
}
export default defineComponent({
  name: 'ShopInfo',
  components: {
    [Tag.name]: Tag,
    [Divider.name]: Divider,
    [Image.name]: Image,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
  },
  setup(){
    const store = useStore();
    const info = computed(() => store.state.shop.info);
    return {
      info,
      typeMap,
    };
  },

});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

<template>
  <section class="my_container">
    <van-nav-bar
      title="我的"
      fixed
    />
    <header>
      <van-image :src="userInfo.user_avatar || img" />
      <div
        v-if="userInfo._id"
        class="desc"
      >
        <div class="lf">
          <h4 class="name">
            {{ userInfo.nickname }}
          </h4>
          <p>
            {{ userInfo.phone_number }}
            <!-- 取消a标签默认行为 -->
            <a
              href="javascript:;"
              @click="desPhone"
            > 查看 </a>
          </p>
        </div>
        <div class="rg">
          <van-icon
            name="arrow"
            color="white"
          />
        </div>
      </div>
      <div
        v-else
        class="login"
        @click="go_login"
      >
        登录｜注册
      </div>
    </header>
    <main>
      <div @click="tips">
        <h4 class="balance">
          0.00<span>元</span>
        </h4>
        <p>我的余额</p>
      </div>
      <div @click="tips">
        <h4 class="preferential">
          0<span>个</span>
        </h4>
        <p>我的优惠</p>
      </div>
      <div @click="tips">
        <h4 class="integral">
          0<span>分</span>
        </h4>
        <p>我的积分</p>
      </div>
    </main>
    <footer>
      <van-cell-group>
        <van-cell
          v-for="item in cellList"
          :key="item.name"
          :title="item.title"
          is-link
          arrow-direction
          :to="item.to"
          @click="tips"
        >
          <template #icon>
            <van-icon
              :name="item.name"
              :color="item.color"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <van-button
        v-show="userInfo._id"
        type="danger"
        block
        @click="logout"
      >
        退出登录
      </van-button>
    </footer>
  </section>
</template>
<script lang="ts" >
import { defineComponent, computed } from 'vue';
import { Button, NavBar, Image, Icon, Dialog, Cell, CellGroup, Toast } from 'vant';
import { useStore } from 'vuex';
import { fetchAesDecryptPhone, fetchLogout } from 'api/user';
import img from './assets/default-avatar.webp';
import { go_login, no_token, tips } from 'utils/base';
export default defineComponent({
  name: 'My',
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  setup(){
    const cellList = [
      { name: 'column', color: '#1E9B84', title: '我的订单', to: '' },
      { name: 'gold-coin', color: '#1E9B84', title: '积分商城', to: '' },
      { name: 'card', color: '#1E9B84', title: '桔止外卖会员卡', to: '' },
      { name: 'award', color: '#1E9B84', title: '服务中心', to: '' },
    ];
    const store = useStore();
    const userInfo = computed<IUserInfo>(() => store.state.user.userInfo);
    const handleClick = () => {
      store.commit('home/add');
    };
    const desPhone = async() => {
      const res = await fetchAesDecryptPhone();
      Dialog.alert({
        title: '手机号明细',
        message: res.data.phone_number,
        theme: 'round-button',
      }).then(() => {
        console.log('关闭');
        // on close
      });
    };
    const logout = async() => {
      Dialog.confirm({
        title: '确认退出',
        message: '退出后将无法接收服务消息，您真的要退出吗？',
      }).then(async() => {
        Toast.loading('退出登录中');
        const res = await fetchLogout();
        if(/^2/.test(res?.status.toString())){
          no_token();
          Toast.success(res.data.message);
        }
        // on confirm
      }).catch(() => {
        console.log('取消退出');
        // on cancel
      });
    };

    return {
      img,
      userInfo,
      cellList,
      handleClick,
      desPhone,
      logout,
      go_login,
      tips,
    };

  },
});
</script>
<style lang="scss" scoped >
  @import './index.scss';
</style>

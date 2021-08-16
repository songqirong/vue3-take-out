<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
    />
    <p class="title">
      桔止外卖
    </p>
    <van-tabs
      v-model:active="active"
      title-active-color="#1E9B84"
      swipeable
      :before-change="beforeChange"
    >
      <van-tab title="短信登录">
        <van-form
          :validate-first="true"
          @submit="(values) => { onSubmit(values, 'code') }"
        >
          <van-field
            v-model="phone_number"
            name="phone_number"
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            required
            maxlength="11"
            autocomplete="false"
            :rules="[{ validator }]"
          />
          <van-field
            v-model="code"
            name="code"
            label="验证码"
            placeholder="请输入短信验证码"
            required
            :rules="[{ required: true, message: '请输入短信验证码' }]"
          >
            <template #button>
              <van-button
                :disabled="hasSend"
                size="small"
                :color="hasSend ? '#f7f7f7' : '#1E9B84'"
                :class="{'send-code': true, 'color-grey': hasSend}"
                @click="sendCode"
              >
                {{ hasSend ? `${seconds}秒` : '发送验证码' }}
              </van-button>
            </template>
          </van-field>
          <van-checkbox
            v-model="agree"
            shape="square"
          >
            我同意桔止外卖的<van-button
              type="primary"
              plain
              to="/user-agree"
            >
              《用户服务协议》
            </van-button>
          </van-checkbox>
          <van-button
            square
            block
            type="success"
            class="submit"
            native-type="submit"
          >
            登录
          </van-button>
        </van-form>
        <p class="tip">
          温馨提示：未注册过桔止外卖的手机号，登录后将会自行注册,请悉知
        </p>
      </van-tab>
      <van-tab title="密码登录">
        <van-form
          :validate-first="true"
          @submit="(values) => { onSubmit(values, 'pass') }"
        >
          <van-field
            v-model="phone_number"
            name="phone_number"
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            required
            maxlength="11"
            :rules="[{ validator }]"
          />
          <van-field
            v-model="password"
            :type="checked ? 'text' : 'password'"
            name="password"
            label="密码"
            placeholder="请输入密码"
            required
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <template #button>
              <van-switch
                v-model="checked"
                size="20"
              />
            </template>
          </van-field>
          <van-field
            v-model="captcha"
            label="验证码"
            name="captcha"
            required
            maxlength="4"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <template #button>
              <img
                ref="imgRef"
                class="captcha-img"
                src="https://takeoutapi.persion.cn/users/getCaptcha"
                alt="captcha"
                @click="changeCaptcha"
              >
            </template>
          </van-field>
          <van-button
            square
            block
            type="success"
            class="submit"
            native-type="submit"
          >
            登录
          </van-button>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { NavBar, Tabs, Tab, Form, Cell, Field, Button, Switch, Checkbox, Toast } from 'vant';
import { check_phone } from '@/utils/base';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import http from 'api/index';
let myTimer: any;
export default defineComponent({
  name: 'Login',
  components: {
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Form.name]: Form,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [Switch.name]: Switch,
    [Checkbox.name]: Checkbox,
  },
  setup(){
    const store = useStore();
    const state = reactive({
      active: 0,
      phone_number: '',
      password: '',
      captcha: '',
      code: '',
      checked: false,
      hasSend: false,
      seconds: 59,
      agree: true,
    });
    const router = useRouter();
    const imgRef = ref();
    const { fetchLogin, fetchGetCode } = http;
    // 点击表单提交
    const onSubmit = (values, type: 'pass' | 'code') => {
      if(type === 'code' && !state.agree) return Toast('请先勾选协议后再次提交～');
      Toast.loading('登录中，请稍等～');
      imgRef.value.click();
      fetchLogin({ ...values, type }).then((res) => {
        Toast.success(res.data.message);
        store.commit('user/changeUserInfo', res.data.data);
        clearTimer();
        router.replace('/home');
      });
    };

    // 清除定时器,防止内存泄漏
    const clearTimer = () => {
      // 登录成功后清空表单
      beforeChange();
      if(myTimer){
        clearInterval(myTimer);
        state.seconds = 59;
        state.hasSend = false;
      }
    };


    // 发送验证码
    const sendCode = () => {
      if(!check_phone(state.phone_number)) return;
      state.hasSend = true;
      fetchGetCode({ phone_number: state.phone_number });
      myTimer = setInterval(() => {
        state.seconds--;
        if(state.seconds <= 0){
          clearInterval(myTimer);
        }
      }, 1000);
    };

    const beforeChange = () => {
      state.phone_number = '';
      if(state.active === 0){
        state.code = '';
        state.agree = true;
      } else {
        state.captcha = '';
        state.password = '';
      }
      return true;
    };

    // 验证函数
    const validator = (val) => {
      if(!val){
        return '请输入手机号';
      } else if(!check_phone(val)){
        return '手机号格式不正确';
      } else {
        return true;
      }
    };

    const changeCaptcha = (e: any) => {
      e.target.src = `https://takeoutapi.persion.cn/users/getCaptcha?${Math.random()}`;
    };
    return {
      ...toRefs(state),
      onSubmit,
      changeCaptcha,
      sendCode,
      validator,
      beforeChange,
      clearTimer,
      imgRef,
    };
  },
  beforeUnmount(){
    this.clearTimer();
  },
});
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>

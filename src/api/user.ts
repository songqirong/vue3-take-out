import { AxiosResponse } from 'axios';
import axios from 'utils/http';

// 登录
export const fetchLogin: (payload: any) => Promise<AxiosResponse<any>> = (payload) => axios.post('/users/login', payload);

// 发送短信验证码
export const fetchGetCode: (payload: any) => Promise<AxiosResponse<any>> = (payload: any) => axios.post('/users/SMSCaptcha', payload);

// 获取用户信息
export const fetchGetUserInfo: () => Promise<AxiosResponse<any>> = () => axios.get('/users/getUserInfo');
export default {
  fetchLogin,
  fetchGetCode,
  fetchGetUserInfo,
};

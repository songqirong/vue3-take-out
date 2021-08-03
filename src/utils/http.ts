import axios, { AxiosResponse, AxiosError } from 'axios';
import { Toast } from 'vant';
import { no_token } from './base';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3001/api', // 请求头路径
  withCredentials: true, // 允许携带cookie
  timeout: 5000, //设置超时
});

// 请求拦截器
instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// 响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => response, (error: AxiosError) => {
  if(error.response?.status === 401){
    no_token();
  } else {
    Toast.fail(error.response?.data.message);
  }
});

export default instance;

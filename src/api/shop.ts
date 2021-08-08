import { AxiosResponse } from 'axios';
import axios from 'axios';
import instance from 'utils/http';

// 请求食物信息
export const fetchGoods: () => Promise<AxiosResponse<any>> = () => axios.get('/shop/goods');

// 请求商家信息
export const fetchInfo: () => Promise<AxiosResponse<any>> = () => axios.get('/shop/info');

// 请求商家评价
export const fetchRatings: () => Promise<AxiosResponse<any>> = () => axios.get('/shop/ratings');

// 获取搜索栏数据
export const fetchSerachShop: (params: Record<string, string>) => Promise<AxiosResponse<any>> = (params) => instance.get('/good/search/shops', { params });

export default {
  fetchGoods,
  fetchInfo,
  fetchRatings,
  fetchSerachShop,
};

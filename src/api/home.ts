import axios from 'utils/http';

// 获取分类菜单
export const getAllgories = () => axios.get('/good/categories');

// 获取店铺列表
export const getShops = () => axios.get('/good/shops');

export default {
  getAllgories,
};

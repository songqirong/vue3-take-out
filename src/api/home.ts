import axios from 'utils/http';
import axios1 from 'axios';

// 获取分类菜单
export const getAllgories = () => axios.get('/good/categories');

// 获取店铺列表
export const getShops = () => axios1.get('/shops');

export default {
  getAllgories,
  getShops,
};

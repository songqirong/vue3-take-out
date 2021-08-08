import { fetchGoods, fetchInfo, fetchRatings, fetchSerachShop } from 'api/shop';
import { clone_deep } from 'utils/base';
export default {
  namespaced: true,
  state: {
    info: {},
    ratings: {},
    goods: {},
    buyList: {},
    badgeList: {},
    totalBuy: 0,
    totalPrice: 0,
    searchShop: [],
  },
  getters: {

  },
  mutations: {
    updateInfo(state, payload){
      state.info = payload;
    },
    updateGoods(state, payload){
      state.goods = payload;
    },
    updateRatings(state, payload){
      state.ratings = payload;
    },
    updateList(state, { type, name, price, cate }){
      if(type === 'add'){
        state.totalBuy++;
        state.totalPrice += price;
        // 证明购物车里已有该商品存在
        if(Object.prototype.hasOwnProperty.call(state.buyList, name )){
          state.buyList = { ...state.buyList, [name]: { count: state.buyList[name].count + 1, price, cate } };
        } else {
          state.buyList = { ...state.buyList, [name]: { count: 1, price, cate } };
        }
      } else {
        state.totalBuy--;
        state.totalPrice -= price;
        // 大于1就减少，小于1就删除
        if(state.buyList[name].count > 1){
          state.buyList = { ...state.buyList, [name]: { count: state.buyList[name].count - 1, price, cate } };
        } else {
          const newBuyList = clone_deep(state.buyList);
          delete newBuyList[name];
          state.buyList = newBuyList;
        }
      }
      const obj = {};
      for (const key in state.buyList){
        Object.prototype.hasOwnProperty.call(obj, state.buyList[key].cate) ? obj[state.buyList[key].cate] += state.buyList[key].count : obj[state.buyList[key].cate] = state.buyList[key].count;
      }
      state.badgeList = obj;
    },
    clearBuyList(state){
      state.totalBuy = 0;
      state.totalPrice = 0;
      state.buyList = {};
      state.badgeList = {};
    },
    updateSearchShop(state, payload){
      state.searchShop = payload;
    },
  },
  actions: {
    async fetchShopGoods(store){
      const res = await fetchGoods();
      store.commit('updateGoods', res.data.data);
    },
    async fetchShopInfo({ commit }, payload){
      const res = await fetchInfo();
      commit('updateInfo', res.data.data);
    },
    async fetchShopRatings({ commit }, payload){
      const res = await fetchRatings();
      commit('updateRatings', res.data.data);
    },
    async fetchSearchShops({ commit }, params){
      const res = await fetchSerachShop(params);
      console.log('res', res);
      commit('updateSearchShop', res.data.data);
    },
  },
};

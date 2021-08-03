import { getAllgories, getShops } from 'api/home';
export default {
  namespaced: true,
  state: {
    count: 1,
    categories: [],
    shops: [],
  },
  getters: {

  },
  mutations: {
    add(state: any){
      state.count++;
    },
    updateCateGories(state, payload){
      const arr: any[][] = [];
      const len = payload.length;
      for(let i = 0; i <= Math.floor(len / 8); i++){
        arr.push(payload.slice(i * 8, (i + 1) * 8 > len ? undefined : (i + 1) * 8));
      }
      state.categories = arr;
    },
    updateShops(state, payload){
      state.shops = payload;
    },
  },
  actions: {
    async fetchAllGories(store){
      const res = await getAllgories();
      store.commit('updateCateGories', res.data.data);
    },
    async fetchShops({ commit }, payload){
      const res = await getShops();
      commit('updateShops', res.data.data);
    },
  },
};

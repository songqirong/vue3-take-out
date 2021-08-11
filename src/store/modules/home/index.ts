import { getLocation } from '@/api/baidu';
import { getAllgories, getShops } from 'api/home';
import { Toast } from 'vant';
export default {
  namespaced: true,
  state: {
    categories: [],
    shops: [],
    positionInfo: {
      location: {
        lat: 22.578261698192723,
        lng: 113.87438792205567,
      },
    },
  },
  getters: {

  },
  mutations: {
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
    updatePositionInfo(state, payload){
      state.positionInfo = payload;
    },
  },
  actions: {
    async fetchAllGories(store){
      const res = await getAllgories();
      store.commit('updateCateGories', res.data.data);
    },
    async fetchShops({ commit, state }, payload){
      const res = await getShops();
      commit('updateShops', payload?.isOne ? res.data.data : [...state.shops, ...res.data.data]);
    },
    async fetchPositionInfo({ commit }, payload){
      function getPos(){
        return new Promise<any>((resolve, reject) => {
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
              resolve({ longitude: position.coords.longitude, latitude: position.coords.latitude });
            }), function(error){
              console.log(error, 'err');
            }, {
              enableHighAccuracy: true,
              maximumAge: 75000,
              timeout: 30000,
            };
          } else {
            Toast('当前浏览器不支持定位');
          }
        });
      }

      const obj = await getPos();
      const longitude = obj.longitude || 113.868;
      const latitude = obj.latitude || 22.575;
      // const longitude = 113.868;
      // const latitude = 22.575;
      const res = await getLocation(latitude, longitude);
      // state.city = res.data.data.addressComponent.city;
      commit('updatePositionInfo', res.data.data);

    },

  },
};

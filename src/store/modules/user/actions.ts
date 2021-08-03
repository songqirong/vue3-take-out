import http from 'api/index';
export default {
  async getUserInfo(store){
    const res = await http.fetchGetUserInfo();
    res && store.commit('changeUserInfo', res.data?.data);
  },
};

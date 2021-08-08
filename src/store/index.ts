import { createStore } from 'vuex';
import homeStore from './modules/home';
import userStore from './modules/user';
import shopStore from './modules/shop';
const store = createStore({
  modules: {
    home: homeStore,
    user: userStore,
    shop: shopStore,
  },
});
export default store;

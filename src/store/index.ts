import { createStore } from 'vuex';
import homeStore from './modules/home';
import userStore from './modules/user';
const store = createStore({
  modules: {
    home: homeStore,
    user: userStore,
  },
});
export default store;

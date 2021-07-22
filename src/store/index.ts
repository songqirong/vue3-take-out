import { createStore } from 'vuex';
import homeStore from './modules/home';
const store = createStore({
  modules: {
    home: homeStore,
  },
});
export default store;

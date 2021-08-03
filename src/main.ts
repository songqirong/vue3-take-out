import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';
import http from 'api/index';
import { Lazyload } from 'vant';
const app = createApp(App);
app.config.globalProperties.$http = http;
app.use(router).use(store).use(Lazyload).mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';
import http from 'api/index';
const app = createApp(App);
app.config.globalProperties.$http = http;

// createApp.prototype.$http = http;
app.use(router).use(store).mount('#app');

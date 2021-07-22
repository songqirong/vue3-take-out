import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', alias: '/', name: 'Home', component: () => import('./views/home/home.vue') },
  ],
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', name: 'Home', component: () => import('./views/home/index.vue') },
    { path: '/login', name: 'Login', component: () => import('./views/login/index.vue') },
    { path: '/search', name: 'Search', component: () => import('./views/search/index.vue') },
    { path: '/friends', name: 'Friends', component: () => import('./views/friends/index.vue') },
    { path: '/my', name: 'My', component: () => import('./views/My/index.vue') },
    { path: '/not-found', name: 'NotFound', component: () => import('./views/not-found/index.vue') },
    { path: '/', redirect: '/home' },
  ],
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(!router.hasRoute(to.name as any)){
    router.replace('/not-found');
  } else {
    next();
  }
});

export default router;

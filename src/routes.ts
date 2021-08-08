import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', name: 'Home', component: () => import('./views/home/index.vue') },
    { path: '/login', name: 'Login', component: () => import('./views/login/index.vue') },
    { path: '/search', name: 'Search', component: () => import('./views/search/index.vue') },
    { path: '/cart', name: 'Cart', component: () => import('./views/cart/index.vue') },
    { path: '/my', name: 'My', component: () => import('./views/my/index.vue') },
    { path: '/shop', name: 'Shop', component: () => import('./views/shop/index.vue'), redirect: '/shop/goods', children: [
      { path: '/shop/goods', name: 'ShopGoods', component: () => import('./views/shop/routes/shop-goods/index.vue') },
      { path: '/shop/ratings', name: 'ShopRatings', component: () => import('./views/shop/routes/shop-ratings/index.vue') },
      { path: '/shop/info', name: 'ShopInfo', component: () => import('./views/shop/routes/shop-info/index.vue') },
    ] },
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

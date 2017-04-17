import AdminRouter from './router.admin';
import MallRouter from './router.mall';
import ShopRouter from './router.shop';
import SellerRouter from './router.seller';

import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {isLogin} from '../api/user';

const routes = [
  // AdminRouter,
  MallRouter,
  // ShopRouter,
  // SellerRouter,
  {path: '/login', name: 'login', component: Login, meta: {ignore: true}},
  {path: '/notfound', component: NotFound, meta: {ignore: true}},
  // {path: '*', redirect: '/notfound'}
];


Vue.use(VueRouter); //路由

const router = new VueRouter({
  routes
});

//用户信息过滤
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.ignore) && !isLogin()) {

    next({path: '/login', query: {redirect: from.path}});
  } else {
    to.path === '/login' && isLogin() ? next({path: to.query.redirect || '/mall'}) : next();
  }

});


export default router;

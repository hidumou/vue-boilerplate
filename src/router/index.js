import Index from '../pages/Index.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {isLogin} from '../api/user';

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {path: '/home', name: 'home', component: Home},
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {ignore: true}
  },
  //404
  {
    path: '/notfound',
    component: NotFound,
    meta: {ignore: true}
  },

  {
    path: '*',
    redirect: '/notfound'
  }
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
    to.path === '/login' && isLogin() ? next({path: to.query.redirect || '/home'}) : next();
  }

});


export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import store from './stores';
import axios from 'axios';
import layer from 'layui-layer';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import './mock-data';

// Vue.config.productionTip = false;

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    layer.load(2);
    config.headers['User-Agent'] = 'ParkingWangAPIClientWeb';
    config.headers['Accept-Version'] = 'v2.0';
    return config;
  },
  err => {
    return Promise.reject(err);
  });

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
    layer.closeAll('loading');
    return response;
  },
  error => {
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
);

//路由
Vue.use(VueRouter);

//UI组件
Vue.use(iView);

const router = new VueRouter({
  routes
});


const app = new Vue({
  router,
  store
}).$mount('#app');

import Vue from 'vue';
import router from './router';
import store from './stores';
import axios from 'axios';
import layer from 'layui-layer';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import './mock';


Vue.config.productionTip = false; //生产环境提示信息 是否显示

axios.PARK_API = '/v3';//api 地址配置   //http://180.97.80.42:9090/v3';


//请求拦截器
axios.interceptors.request.use(config => {
    layer.load(2);
    config.headers['Accept-Version'] = 'v3.0';
    return config;
  },
  err => {
    return Promise.reject(err);
  });


//响应拦截器
axios.interceptors.response.use(response => {
    layer.closeAll('loading');
    return response.data;
  },
  error => {
    return Promise.reject(error.response)
  }
);

const app = new Vue({
  router,
  store
}).$mount('#app');

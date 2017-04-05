import Vue from 'vue';
import router from './router';
import store from './stores';
import * as filters from './commons/filters';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './api/axios.config';

// import './mock';


Vue.config.productionTip = false; //生产环境提示信息 是否显示

//reg filter
Object.keys(filters).forEach(function (k) {
  Vue.filter(k, filters[k]);
});

const app = new Vue({
  router,
  store
}).$mount('#app');

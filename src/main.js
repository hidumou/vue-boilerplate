import Vue from 'vue';
import router from './router';
import store from './stores';
import * as filters from './commons/filters';
import components from './components';
import * as directives from './commons/directives';

import './api/axios.config';
import './commons/utils/validator.extends';


//生产环境提示信息 是否显示
Vue.config.productionTip = false;

//reg filters
Object.keys(filters).forEach(function (k) {Vue.filter(k, filters[k]);});

//reg components
Object.keys(components).forEach(function (k) {Vue.component(k, components[k]);});

//reg directives
Object.keys(directives).forEach(function (k) {Vue.directive(k, directives[k]);});

new Vue({router, store}).$mount('#app');

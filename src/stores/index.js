/**
 * @file index
 * Created by haner on 2017/3/27.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';
import * as getters from './getters';
import demo from './modules/demo';
import home from './modules/home';
import user from './modules/user';

Vue.use(Vuex);

let store = new Vuex.Store({
  actions,
  getters,
  modules: {
    demo,
    home,
    user
  },
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
});

window.store = store;
export default store;

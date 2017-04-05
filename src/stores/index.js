/**
 * @file index
 * Created by haner on 2017/3/27.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';
import * as getters from './getters';

import commonState from './commonState';
import demo from './modules/demo';
import home from './modules/home';
import user from './modules/user';
import recharge from './modules/recharge';

Vue.use(Vuex);

let store = new Vuex.Store({
  actions,
  getters,
  state:commonState,
  modules: {
    demo,
    home,
    user,
    recharge
  },
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
});


export default store;

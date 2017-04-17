/**
 * @file index
 * Created by haner on 2017/3/27.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import commonState from './commonState';
import user from './modules/user';
import shop from './modules/shop';
import recharge from './modules/recharge';
import meeting from './modules/meeting';
import dispatch from './modules/dispatch';

Vue.use(Vuex);

let store = new Vuex.Store({
  actions:actions,
  getters:getters,
  state:commonState,
  mutations:mutations,
  modules: {
    user,
    recharge,
    shop,
    meeting,
    dispatch,
  },
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
});


export default store;

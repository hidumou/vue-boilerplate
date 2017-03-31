/**
 * @file user
 * Created by haner on 2017/3/31.
 * @brief
 */

import * as types from '../mutation-types';
import * as UserService from '../../api/user';
import Storage from '../../commons/utils/Storage';
import layer from 'layui-layer';

const state = {
  info: UserService.getUser(),
  isLogin: false
};


//action
const actions = {
  login({commit}, params){
    commit(types.USER_LOGIN_STATE, true);
    UserService.login(params).then(res => {
      if (res.status !== 0) {
        layer.msg(res.msg || 'error');
        commit(types.USER_LOGIN_STATE, false);
        return;
      }
      commit(types.USER_LOGIN, res.data);
    });
  },

  logout({commit}){
    UserService.logout({token: UserService.getUser().token}).then(res => {
      if (res.status !== 0) {
        layer.msg(res.msg || 'error');
        return;
      }
      commit(types.USER_LOGOUT);
    });
  }
};


//mutations
const mutations = {
  [types.USER_LOGIN](state, data){
    state.isLogin = false;
    state.info = data;
    Storage.set(Storage.TOKEN, data);
  },

  [types.USER_LOGOUT](state){
    state.info = null;
    Storage.remove(Storage.TOKEN);
  },

  [types.USER_LOGIN_STATE](state, isLogin){
    state.isLogin = isLogin;
  },

};


// getters
const getters = {
  info: state => state.info,
  isLogin: state => state.isLogin
};


export default {
  state,
  actions,
  mutations,
  getters
}

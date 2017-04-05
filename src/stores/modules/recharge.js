/**
 * @file dashboard
 * Created by haner on 2017/4/1.
 * @brief
 */

import * as types from '../mutation-types';
import * as RechargeService from '../../api/recharge';
import * as UserService from '../../api/user';
import layer from 'layui-layer';
import RecordData from '../../mock/record';

//state
const state = {
  pageData: null,
  currentPage: 1,
  pageSize: 10,
};


//actions
const actions = {
  getRechargeList({commit, state},params){
    RechargeService.getRechargeList($.extend({
      token: UserService.getUser().token,
      page: state.currentPage,
      per_page: state.pageSize
    },params)).then(res => {
      commit(types.RECHARGE_LIST_GET, RecordData.data || (res.data) || {});
    });
  }
};

const mutations = {
  [types.RECHARGE_LIST_GET](state, data){
    state.pageData = data;
  }
};

const getters = {
  rechargeRecordList: state => state.pageData && state.pageData.records,
  currentPage: state => state.currentPage,
  pageSize: state => state.pageSize,
};

export default {
  state,
  actions,
  mutations,
  getters
}

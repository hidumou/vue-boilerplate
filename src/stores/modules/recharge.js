/**
 * @file dashboard
 * Created by haner on 2017/4/1.
 * @brief
 */

import {RECHARGE_LIST_GET} from '../mutation-types';
import * as RechargeService from '../../api/recharge';
import * as UserService from '../../api/user';
import layer from 'layui-layer';
import RecordData from '../../mock/record';

//state
const state = {
  response: {},
};


//actions
const actions = {
  getRechargeList({commit},params){
    RechargeService.getRechargeList(params).then(res => {
      if (res.status !== 0) {
        layer.msg(res.msg || 'error');
        return;
      }
      commit(RECHARGE_LIST_GET, (res.data) || {});
    });
  }
};

//mutations
const mutations = {
  [RECHARGE_LIST_GET](state, data){
    state.response = data;
  }
};

//getters
const getters = {
  rechargeRecordList: state => state.response && state.response.records,
};



export default {
  state,
  actions,
  mutations,
  getters
}

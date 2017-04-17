/**
 * @file index
 * Created by haner on 2017/3/28.
 */

import * as types from '../../mutation-types';
import * as actions from './action';
import * as getters from './getters';

const state = {
  response:{},
  changeRecord:{}
};

const mutations = {

  [types.GET_MEETING_LIST](state,res){
    state.response = res;
  },

  [types.DELETE_MEETING](state, idx){
    let list = getters.meetingList(state);
    list.splice(idx,1);
  },

  [types.GET_MEETING_COUPON_CHANGE_RECORD](state,record){
      state.changeRecord = record;
  }
};


export default {
  actions,
  getters,
  state,
  mutations
}

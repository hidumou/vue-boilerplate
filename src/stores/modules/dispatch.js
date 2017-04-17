/**
 * @file dispatch
 * Created by haner on 2017/4/11.
 * @brief
 */



import {GET_DISPATCH_LIST} from '../mutation-types';
import * as ShopService from '../../api/shop';
import layer from 'layui-layer';


const state = {
  //发放记录
  dispatchRecord:{},
};


const actions = {
  /**
   * 获取分发列表记录
   * @param commit
   * @param params
   */
  getDispatchRecordList({commit}, params){
    ShopService.getDispatchRecordList(params).then(res => {
      if (res.status !== 0) {
        layer.msg(res.msg || 'error');
        return;
      }
      commit(GET_DISPATCH_LIST, res.data);
    });
  },
};

const getters = {
  dispatchRecordData: state => state.dispatchRecord.records || [],
  dispatchRecordRes: state => state.dispatchRecord || {},
};

const mutations = {

  [GET_DISPATCH_LIST](state, data){
    state.dispatchRecord = data;
  },

};

export default {
  state,
  actions,
  mutations,
  getters
}

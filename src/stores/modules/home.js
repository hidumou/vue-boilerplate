/**
 * @file home
 * Created by haner on 2017/3/28.
 */
import * as types from '../mutation-types';
import {getHomeListData} from '../../api/home';
/**
 * state
 * @type {{}}
 */
const state = {
  tableData: []
};


/**
 * actions
 * @type {{}}
 */
const actions = {
  getHomeListData({commit, state}){
    getHomeListData().then(res => {
      commit(types.GET_HOME_LIST,res.data);
    });
  }
};


/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GET_HOME_LIST](state, data){
    state.tableData = data;
  }
};


/**
 * getters
 * @type {{}}
 */
const getters = {
  tableData: state => state.tableData
};

export default {
  state,
  actions,
  mutations,
  getters
}

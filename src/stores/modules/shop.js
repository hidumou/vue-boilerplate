/**
 * @file shop
 * Created by haner on 2017/4/5.
 * @brief
 */

import {GET_SHOP_LIST, GET_SHOP_DETAIL, UPDATE_SHOP, DELETE_SHOP} from '../mutation-types';
import * as ShopService from '../../api/shop';
import layer from 'layui-layer';


const state = {
  list: {},
  detail: {},
};


const actions = {

  getShopList({commit, rootState}, params){
    ShopService.getShopList($.extend({
      page: rootState.pager.currentPage,
      per_page: rootState.pager.pageSize,
    },params)).then(res => {
      if (res.status !== 0) {
        layer.msg(res.msg || 'error');
        return;
      }
      commit(GET_SHOP_LIST, res.data);
    });
  },


  getShopDetail({commit}, params){
    ShopService.getShopDetailById(params).then(res => {
      if (res.status !== 0) {
        layer.msg(res.msg || 'error');
        return;
      }
      commit(GET_SHOP_DETAIL, res.data);
    });
  },

};

const getters = {
  res: state => state.list,
  shops: state => state.list.records || []
};

const mutations = {

  [GET_SHOP_LIST](state, data){
    state.list = data;
  },

  [GET_SHOP_DETAIL](state, data){
    state.detail = data;
  },

  [UPDATE_SHOP](state, shop){
    let list = getters.shops(state);
    list = $.map(list, function (item) {
      if (item.id === shop.id) Object.assign(item, shop);
      return item;
    });
  },

  [DELETE_SHOP](state, idx){
    let list = getters.shops(state);
    list.splice(idx,1);
  }
};


export default {
  state,
  actions,
  mutations,
  getters
}

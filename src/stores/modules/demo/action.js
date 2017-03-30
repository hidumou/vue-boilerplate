/**
 * @file action 动作行为 数据获取 等等..
 * Created by haner on 2017/3/28.
 */
import * as types from './mutation-type';

export default {
  add({commit}){
    commit(types.ADD_COUNT);
  },

  cut({commit}){
    commit(types.CUT_COUNT);
  }
};

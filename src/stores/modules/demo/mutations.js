/**
 * @file mutation 突变行为
 * Created by haner on 2017/3/28.
 */

import * as types from './mutation-type';

export default {
  [types.ADD_COUNT](state){
    state.count++;
  },
  [types.CUT_COUNT](state){
    state.count--;
  },
};

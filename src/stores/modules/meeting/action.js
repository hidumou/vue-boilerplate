/**
 * @file action 动作行为 数据获取 等等..
 * Created by haner on 2017/3/28.
 */
import * as types from '../../mutation-types';
import * as MeetingService from '../../../api/shop';
import layer from 'layui-layer';


/**
 * 获取会议列表
 * @param commit
 * @param params
 */
export const getMeetingList = ({commit}, params) => {
  MeetingService.getMeetingList(params).then(res => {
    if (res.status !== 0) {
      layer.msg(res.msg || 'error');
      return;
    }
    commit(types.GET_MEETING_LIST, res.data);
  });
};


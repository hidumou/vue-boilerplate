/**
 * @file recharge
 * Created by haner on 2017/4/1.
 * @brief 充值相关 API
 */


import axios from 'axios';


/**
 * 获取最近重置记录
 * @param params
 */
export const getRechargeList = params => {
  return axios.post(`${axios.PARK_API}/couponRechargeRecords`, params).then(res => res);
};

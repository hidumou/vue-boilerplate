/**
 * @file recharge
 * Created by haner on 2017/4/1.
 * @brief 充值相关 API
 */


import axios from 'axios';


//优惠券充值记录
export const getRechargeList = params => axios.post(`${axios.PARK_API}/couponRechargeRecords`, params).then(res => res);

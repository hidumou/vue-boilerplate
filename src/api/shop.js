/**
 * @file shop
 * Created by haner on 2017/4/5.
 * @brief 商户相关API
 */

import axios from 'axios';

//商户相关
export const saveOrUpdateShop = shop => axios.post(`${axios.PARK_API}/${shop.id ? 'shopEdit' : 'shopAdd'}`, shop).then(res => res);
export const getShopList = params => axios.post(`${axios.PARK_API}/shopRecords`, params).then(res => res);
export const getShopDetailById = params => axios.post(`${axios.PARK_API}/shopDetail`, params).then(res => res);

//会议相关
export const getMeetingList = params => axios.post(`${axios.PARK_API}/activityRecords`, params).then(res => res);
export const getMeetingDetail = params => axios.post(`${axios.PARK_API}/activityDetail`, params).then(res => res);
export const saveOrUpdateMeeting = meeting => axios.post(`${axios.PARK_API}/${meeting.id ? 'activityEdit' : 'activityAdd' }`, meeting).then(res => res);
export const getActivityCouponRecords = params => axios.post(`${axios.PARK_API}/activityCouponRecords`,params).then(res=>res);

//分发记录
export const getDispatchRecordList = params => axios.post(`${axios.PARK_API}/couponRecords`,params).then(res=>res);

//充值
export const couponRecharge = params => axios.post(`${axios.PARK_API}/couponRecharge`,params).then(res=>res);


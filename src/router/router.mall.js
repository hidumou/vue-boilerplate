/**
 * @file router.mall
 * Created by haner on 2017/4/6.
 * @brief 商场路由
 */

import Dashboard from '../pages/shop/Dashboard.vue';
import Index from '../pages/shop/Index.vue';

import ShopList from '../pages/shop/ShopList.vue';
import ShopDetail from '../pages/shop/ShopDetail.vue';
import ShopAdd from '../pages/shop/ShopAdd.vue';

import DispatchList from '../pages/shop/DispatchList.vue';

import UserInfo from '../pages/shop/UserInfo.vue';

import MeetingList from '../pages/shop/MeetingList.vue';
import MeetingDetail from '../pages/shop/MeetingDetail.vue';
import MeetingAdd from '../pages/shop/MeetingAdd.vue';


import RechargeList from '../pages/shop/RechargeList.vue';
import Recharge from '../pages/shop/Recharge.vue';

export default {

  path: '/mall', name: 'mall', component: Index, redirect: {name: 'mall.dashboard'},

  children: [

    //商户
    {path: 'dashboard', name: 'mall.dashboard', component: Dashboard},

    {path: 'list', name: 'mall.list', component: ShopList, children: []},

    {path: 'list/detail/:id', name: 'mall.detail', component: ShopDetail, children: []},

    {path: 'list/add', name: 'mall.add', component: ShopAdd, children: []},



    {path: 'dispatch', name: 'mall.dispatch', component: DispatchList, children: []},

    {path: 'recharge', name: 'mall.recharge', component: RechargeList},

    {path: 'recharge/add', name: 'mall.recharge.add', component: Recharge},


    //会议
    {path: 'meeting', name: 'mall.meeting.list', component: MeetingList},

    {path: 'meeting/detail/:id', name: 'mall.meeting.detail', component: MeetingDetail},

    {path: 'meeting/add', name: 'mall.meeting.add', component: MeetingAdd},


    //个人信息
    {path: 'user/center', name: 'mall.user.center', component: UserInfo},

  ]
}

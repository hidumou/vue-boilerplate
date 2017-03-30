/**
 * @file home
 * Created by haner on 2017/3/28.
 */

import axios from 'axios';

export const getHomeListData = params => { return axios.post(`${axios.PARK_API}/index/getList`, params).then(res => res); };

/**
 * @file home
 * Created by haner on 2017/3/28.
 */

import axios from 'axios';

let base = '';

export const getHomeListData = params => { return axios.post(`${base}/index/getList`, params).then(res => res.data.data); };

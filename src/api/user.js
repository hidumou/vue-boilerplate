/**
 * @file login
 * Created by haner on 2017/3/30.
 * @brief
 */

import axios from 'axios';
import sha256 from 'sha256';
import Storage from '../commons/utils/Storage';

/**
 * 登录
 * @param params
 */
export const login = params => {
  params.password = sha256(params.password);
  return axios.post(`${axios.PARK_API}/login`, params).then(res => res);
};


/**
 * 登出
 * @param params
 */
export const logout = params => {
  return axios.post(`${axios.PARK_API}/logout`, params).then(res => res);
};

/**
 * 是否登录
 */
export const isLogin = () => {
  let user = Storage.get(Storage.TOKEN);
  return user && user.token;
};


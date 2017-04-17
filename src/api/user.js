/**
 * @file login
 * Created by haner on 2017/3/30.
 * @brief
 */

import axios from 'axios';
import sha256 from 'sha256';
import Storage from '../commons/utils/storage';


//登录
export const login = params => {
  params.password = sha256(params.password);
  return axios.post(`${axios.PARK_API}/login`, params).then(res => res);
};

//登出
export const logout = params => axios.post(`${axios.PARK_API}/logout`, params).then(res => res);

//是否登录
export const isLogin = () => {
  let user = getUser();
  return user && user.token;
};

//获取本地存储用户信息
export const getUser = () => Storage.get(Storage.TOKEN);

//获取用户信息
export const getUserInfo = () => axios.post(`${axios.PARK_API}/infoGet`,{}).then(res => res);

//修改用户信息
export const editUserInfo = params => {
  params.old_password = params.old_password && sha256(params.old_password);
  params.new_password = params.new_password && sha256(params.new_password);
  return axios.post(`${axios.PARK_API}/infoEdit`,params).then(res => res);
};




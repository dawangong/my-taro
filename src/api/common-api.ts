/*
 * @Author: your name
 * @Date: 2021-07-21 22:05:50
 * @LastEditTime: 2021-07-28 17:00:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/common-api.ts
 */
import http from '../services/index';

const registerApi = (data) => {
  return http.post({
    url: '/app/v1/business/merchant/register',
    data,
  });
}

const loginApi = (data) => {
  return http.post({
    url: '/app/v1/business/merchant/login',
    data,
  });
}

export {
  registerApi,
  loginApi,
}
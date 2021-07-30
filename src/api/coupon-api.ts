/*
 * @Author: your name
 * @Date: 2021-07-21 22:05:50
 * @LastEditTime: 2021-07-29 11:21:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/common-api.ts
 */
import http from '../services/index';

const addCouponApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/coupon/add',
    data,
  });
}

const getCouponListApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/coupon/list',
    data,
  });
}

export {
  addCouponApi,
  getCouponListApi,
}
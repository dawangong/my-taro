/*
 * @Author: your name
 * @Date: 2021-07-21 22:05:50
 * @LastEditTime: 2021-08-05 16:33:32
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

const removeCouponApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/coupon/delete',
    data,
  });
}

const editCouponApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/coupon/save',
    data,
  });
}

const offCouponApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/user-coupon/write-off',
    data,
  });
}

const offCouponListApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/user-coupon/list',
    data: {...data, status: 1},
  });
}

export {
  addCouponApi,
  getCouponListApi,
  removeCouponApi,
  editCouponApi,
  offCouponApi,
  offCouponListApi,
}
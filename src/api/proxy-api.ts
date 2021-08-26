/*
 * @Author: your name
 * @Date: 2021-07-21 22:05:50
 * @LastEditTime: 2021-08-26 15:26:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/common-api.ts
 */
import http from '../services/index';

const registerApi = (data) => {
  return http.post({
    url: '/app/v1/agent/super-agent/register',
    data,
  });
}

const loginApi = (data) => {
  return http.post({
    url: '/app/v1/agent/super-agent/login',
    data,
  });
}

const logoutApi = (data?) => {
  return http.post({
    url: '/app/v1/agent/super-agent/logout',
    data,
  });
}

const setPasswordApi = (data) => {
  return http.post({
    url: '/app/v1/agent/super-agent/set-pass-word',
    data,
  });
}

const getBusinessInfoApi = (data?) => {
  return http.post({
    url: '/app/v1/agent/super-agent/details',
    data,
  });
}

const updateBusinessInfoApi = (data) => {
  return http.post({
    url: '/app/v1/business/merchant/save-business',
    data,
  });
}

const getVideoListApi = data => {
  return http.post({
    url: '/app/v1/business/activity/video/list',
    data,
  });
}

const addVideoApi = data => {
  return http.post({
    url: '/app/v1/business/activity/video/add',
    data,
  });
}

const removeVideoApi = data => {
  return http.post({
    url: '/app/v1/business/activity/video/delete',
    data,
  });
}

const getPosterApi = (data?) => {
  return http.post({
    url: '/app/v1/business/merchant/poster',
    data,
  });
}

const goDepositApi = (data?) => {
  return http.post({
    url: '/app/v1/agent/order/pay',
    data,
  });
}

const getDepositListApi = (data?) => {
  return http.post({
    url: '/app/v1/agent/order/list',
    data,
  });
}

const getCommissionListApi = (data?) => {
  return http.post({
    url: '/app/v1/agent/order/commission-list',
    data,
  });
}

const drawingApi = (data?) => {
  return http.post({
    url: '/app/v1/agent/order/drawing',
    data,
  });
}

export {
  registerApi,
  loginApi,
  logoutApi,
  setPasswordApi,
  getBusinessInfoApi,
  updateBusinessInfoApi,
  getVideoListApi,
  addVideoApi,
  removeVideoApi,
  getPosterApi,
  goDepositApi,
  getDepositListApi,
  getCommissionListApi,
  drawingApi,
}
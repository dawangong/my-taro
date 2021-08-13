/*
 * @Author: wh
 * @Date: 2021-08-04 15:26:10
 * @LastEditTime: 2021-08-13 16:13:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/split-api.ts
 */
import http from '../services/index';

const splitListApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/fission/list',
    data,
  });
}

const addSplitApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/fission/add',
    data,
  });
}

const removeSplitApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/fission/delete',
    data,
  });
}

const splitDetailApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/fission/details',
    data,
  });
}

const updateSplitApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/fission/edit',
    data,
  });
}

const upSplitApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/fission/top',
    data,
  });
}


export {
  splitListApi,
  addSplitApi,
  removeSplitApi,
  splitDetailApi,
  updateSplitApi,
  upSplitApi,
}

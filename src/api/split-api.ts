/*
 * @Author: your name
 * @Date: 2021-08-04 15:26:10
 * @LastEditTime: 2021-08-04 15:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/split-api.ts
 */
/*
 * @Author: your name
 * @Date: 2021-08-03 14:29:00
 * @LastEditTime: 2021-08-03 16:30:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/activity-api.ts
 */
/*
 * @Author: your name
 * @Date: 2021-08-03 14:29:00
 * @LastEditTime: 2021-08-03 14:29:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/api/activity-api.ts
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

const removeActivityApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/activity/delete',
    data,
  });
}

const activityDetailApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/activity/details',
    data,
  });
}

const updateActivityApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/activity/edit',
    data,
  });
}

export {
  splitListApi,
  addSplitApi,
  removeActivityApi,
  activityDetailApi,
  updateActivityApi,
}

/*
 * @Author: your name
 * @Date: 2021-08-03 14:29:00
 * @LastEditTime: 2021-08-03 14:49:11
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

const activityListApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/activity/list',
    data,
  });
}

const addActivityApi = (data) => {
  return http.post({
    url: '/app/v1/business/activity/activity/add',
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

export {
  activityListApi,
  addActivityApi,
  removeCouponApi,
  editCouponApi,
}

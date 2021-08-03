/*
 * @Author: your name
 * @Date: 2021-07-27 14:19:08
 * @LastEditTime: 2021-08-03 14:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/activity-edit.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';
import { activityListApi } from '../api/activity-api'

class ActivityEditStore {

  @observable public list: any = [];

  @action.bound
  async getActivityList (data) {
    const res = await activityListApi(data);

    if(res && res.data.code === 200) {
      this.list = res.data.data.list;
    }
  }
  
}

export default createContext(new ActivityEditStore)

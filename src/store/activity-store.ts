/*
 * @Author: your name
 * @Date: 2021-07-27 14:19:08
 * @LastEditTime: 2021-08-03 16:14:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/activity-edit.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';
import { activityListApi, addActivityApi, removeActivityApi } from '../api/activity-api'
import Taro from '@tarojs/taro'

class ActivityEditStore {

  @observable public list: any = [];

  @action.bound
  async getActivityList (data) {
    const res = await activityListApi(data);

    if(res && res.data.code === 200) {
      this.list = res.data.data.list;
    }
  }

  @action.bound
  async addActivity (data) {
    const res = await addActivityApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '添加成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1000);
    }
  }

  @action.bound
  async removeActivity (data) {
    const res = await removeActivityApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '删除成功',
        duration: 1000
      });
      setTimeout(() => {
        this.getActivityList({
          page: 1,
          size: 100
        });
      }, 1000);
    }
}

}

export default createContext(new ActivityEditStore)

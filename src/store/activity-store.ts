/*
 * @Author: your name
 * @Date: 2021-07-27 14:19:08
 * @LastEditTime: 2021-08-03 18:24:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/activity-edit.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';
import { activityListApi, addActivityApi, removeActivityApi, activityDetailApi, updateActivityApi } from '../api/activity-api'
import Taro from '@tarojs/taro'

class ActivityEditStore {

  @observable public list: any = [];
  @observable public prizeItem: any = {};
  @observable public myActivity: any = {
    title: '',
    type: 1,
    start_time: '',
    end_time: '',
    prizes: []
  }

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

  @action.bound
  async getActivity (data) {
    const res = await activityDetailApi(data);

    if(res && res.data.code === 200) {
      this.myActivity = res.data.data;
    }
  }

  @action.bound
  async updateActivity (data) {
    const res = await updateActivityApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '编辑成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1000);
    }
  }

  @action.bound
  reset () {
    this.myActivity = {
      title: '',
      type: 1,
      start_time: '',
      end_time: '',
      prizes: []
    };
  }

  @action.bound
  update(item) {
    this.prizeItem = item;
  }

  @action.bound
  finalUpdate(item) {
    this.myActivity.prizes.push(item);
  }

  @action.bound
  remove(id) {
    const index = this.myActivity.prizes.findIndex(item => item.coupon_id === id);
    this.myActivity.prizes.splice(index, 1);
  }

  @action.bound
  clear() {
    this.prizeItem = {
      coupon_id: 0,
      title: '',
      num: '',
      percentage: "",
      activity_sort: 0,
    };
  }

}

export default createContext(new ActivityEditStore)

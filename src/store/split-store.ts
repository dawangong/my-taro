/*
 * @Author: your name
 * @Date: 2021-08-04 15:27:18
 * @LastEditTime: 2021-08-04 15:29:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/split-store.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';
import { splitListApi, addSplitApi, } from '../api/split-api'
import Taro from '@tarojs/taro'

class SplitStore {

  @observable public list: any = [];

  @action.bound
  async getSplitList (data) {
    const res = await splitListApi(data);

    if(res && res.data.code === 200) {
      this.list = res.data.data.list;
    }
  }

  @action.bound
  async addSplit (data) {
    const res = await addSplitApi(data);

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

  // @action.bound
  // async removeActivity (data) {
  //   const res = await removeActivityApi(data);

  //   if(res && res.data.code === 200) {
  //     Taro.showToast({
  //       icon: 'success',
  //       title: '删除成功',
  //       duration: 1000
  //     });
  //     setTimeout(() => {
  //       this.getActivityList({
  //         page: 1,
  //         size: 100
  //       });
  //     }, 1000);
  //   }
  // }

  // @action.bound
  // async getActivity (data) {
  //   const res = await activityDetailApi(data);

  //   if(res && res.data.code === 200) {
  //     this.myActivity = res.data.data;
  //   }
  // }

  // @action.bound
  // async updateActivity (data) {
  //   const res = await updateActivityApi(data);

  //   if(res && res.data.code === 200) {
  //     Taro.showToast({
  //       icon: 'success',
  //       title: '编辑成功',
  //       duration: 1000
  //     });
  //     setTimeout(() => {
  //       Taro.navigateBack();
  //     }, 1000);
  //   }
  // }

}

export default createContext(new SplitStore)

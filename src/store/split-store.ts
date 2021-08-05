/*
 * @Author: your name
 * @Date: 2021-08-04 15:27:18
 * @LastEditTime: 2021-08-05 14:50:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/split-store.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';
import { splitListApi, addSplitApi, removeSplitApi, splitDetailApi, updateSplitApi } from '../api/split-api'
import Taro from '@tarojs/taro'

class SplitStore {

  @observable public list: any = [];
  @observable public mySplit: any = {
    name: '',
    url: '',
    pic: '',
    object_id: '',
    slogan: '',
    type: 1,
  };

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

  @action.bound
  async removeSplit (data) {
    const res = await removeSplitApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '删除成功',
        duration: 1000
      });
      setTimeout(() => {
        this.getSplitList({
          page: 1,
          size: 10000
        });
      }, 1000);
    }
  }

  @action.bound
  async getSplitDetail (data) {
    const res = await splitDetailApi(data);

    if(res && res.data.code === 200) {
      this.mySplit = res.data.data;
    }
  }

  @action.bound
  async updateSplit (data) {
    const res = await updateSplitApi(data);

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

}

export default createContext(new SplitStore)

/*
 * @Author: your name
 * @Date: 2021-08-04 15:27:18
 * @LastEditTime: 2021-08-23 11:29:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/split-store.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';
import { splitListApi, addSplitApi, removeSplitApi, splitDetailApi, updateSplitApi, upSplitApi } from '../api/split-api'
import Taro from '@tarojs/taro'

class SplitStore {

  @observable public list: any = [];
  @observable public mySplit: any = {
    name: '',
    title: '',
    url: '',
    object_id: '',
    slogan: '',
    type: 1,
    video_id: '',
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
        duration: 2000
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
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
  async upSplit (data) {
    const res = await upSplitApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '置顶成功',
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
        duration: 2000
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    }
  }

  @action.bound
  updateId (id, title?) {
    const { mySplit } =this;
    mySplit.object_id = id;
    mySplit.title = title || "";
    this.mySplit = {...mySplit};
  }

  @action.bound
  clearId () {
    const { mySplit } =this;
    mySplit.object_id = '';
    mySplit.title = '';
    this.mySplit = {...mySplit};
  }

  @action.bound
  updateUrl (item) {
    console.log('video', item);
    const { url, id } = item;
    const { mySplit } =this;
    mySplit.url = url;
    mySplit.video_id = id;
    this.mySplit = {...mySplit};
  }

  @action.bound
  clear () {
    this.mySplit = {
      name: '',
      title: '',
      url: '',
      object_id: '',
      slogan: '',
      type: 1,
      video_id: '',
    };
  }

}

export default createContext(new SplitStore)

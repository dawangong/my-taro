/*
 * @Author: your name
 * @Date: 2021-07-27 14:19:08
 * @LastEditTime: 2021-07-27 17:03:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/activity-edit.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';

class ActivityEditStore {

  @observable public prizes: any = [];

  @observable public prizeItem: any = {
    coupon_id: 0,
    title: '',
    num: '',
    percentage: "",
    activity_sort: 0,
  };

  @action.bound
  update(item) {
    this.prizeItem = item;
  }

  @action.bound
  finalUpdate(item) {
    this.prizes.push(item);
  }

  @action.bound
  remove(id) {
    const index = this.prizes.findIndex(item => item.coupon_id === id);
    this.prizes.splice(index, 1);
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

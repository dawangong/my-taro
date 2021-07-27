/*
 * @Author: your name
 * @Date: 2021-07-27 14:19:08
 * @LastEditTime: 2021-07-27 14:54:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/activity-edit.ts
 */

import { observable, action } from 'mobx'
import { createContext } from 'react';

class ActivityEditStore {
  @observable public prize: any = {
    coupon_id: 0,
    title: '',
  };

  @action.bound
  update(item) {
    this.prize = item;
  }

  @action.bound
  clear() {
    this.prize = {
      coupon_id: 0,
      title: '',
    };
  }
}

export default createContext(new ActivityEditStore)

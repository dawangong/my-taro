/*
 * @Author: your name
 * @Date: 2021-07-22 11:05:32
 * @LastEditTime: 2021-07-29 13:42:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/login.ts
 */
import { observable, action } from 'mobx'
import { createContext } from 'react';
import { addCouponApi, getCouponListApi } from '../api/coupon-api';
import Taro from '@tarojs/taro'

class CouponStore {
  @observable public list: any = [];

  @action.bound
  async addCoupon (data) {
    const res = await addCouponApi(data);

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
  async getCouponList (data) {
    const res = await getCouponListApi(data);

    if(res && res.data.code === 200) {
      this.list = res.data.data.list;
    }
  }
  
}

export default createContext(new CouponStore)
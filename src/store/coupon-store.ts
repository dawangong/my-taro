/*
 * @Author: your name
 * @Date: 2021-07-22 11:05:32
 * @LastEditTime: 2021-08-05 15:29:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/login.ts
 */
import { observable, action } from 'mobx'
import { createContext } from 'react';
import { addCouponApi, getCouponListApi, editCouponApi, removeCouponApi, offCouponApi } from '../api/coupon-api';
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
        Taro.reLaunch({
          url: '/pages/coupon-list/coupon-list'
        });
      }, 1000);
    }
  }

  @action.bound
  async editCoupon (data) {
    const res = await editCouponApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '编辑成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.reLaunch({
          url: '/pages/coupon-list/coupon-list'
        });
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

  @action.bound
  async removeCoupon (data) {
    const res = await removeCouponApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '删除成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1000);
    }
  }

  @action.bound
  async offCoupon (data) {
    const res = await offCouponApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '核销成功',
        duration: 1000
      });
    }
  }
  
}

export default createContext(new CouponStore)
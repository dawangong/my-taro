/*
 * @Author: your name
 * @Date: 2021-07-22 11:05:32
 * @LastEditTime: 2021-08-03 14:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/login.ts
 */
import { observable, action } from 'mobx'
import { createContext } from 'react';
import { addCouponApi, getCouponListApi, editCouponApi, removeCouponApi } from '../api/coupon-api';
import Taro from '@tarojs/taro'

class CouponStore {
  @observable public list: any = [];

  @observable public prizes: any = [];

  @observable public prizeItem: any = {
    coupon_id: 0,
    title: '',
    num: '',
    percentage: "",
    activity_sort: 0,
  };

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
        Taro.redirectTo({
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
        Taro.redirectTo({
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

export default createContext(new CouponStore)
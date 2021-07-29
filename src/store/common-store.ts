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
import { registerApi, loginApi, logoutApi, setPasswordApi, getBusinessInfoApi, updateBusinessInfoApi } from '../api/common-api';
import Taro from '@tarojs/taro'

class CommonStore {
  @observable public businessInfo: any = {};

  @action.bound
  async register (data) {
    const res = await registerApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '注册成功,请登录',
        duration: 1000
      });
    }
  }

  @action.bound
  async login (data) {
    const res = await loginApi(data);
    if(res && res.data.code === 200) {
      Taro.setStorageSync('token', res.data.data.token);
      Taro.showToast({
        icon: 'success',
        title: '登陆成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.redirectTo({
          url: '/pages/center/center'
        })
      }, 1000)
    }
  }

  @action.bound
  async logout () {
    const res = await logoutApi();

    if(res && res.data.code === 200) {
      Taro.removeStorageSync('token');
      this.businessInfo = {};
      Taro.showToast({
        icon: 'success',
        title: '退出登陆成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.redirectTo({
          url: '/pages/login/login'
        })
      }, 1000)
    }
  }

  @action.bound
  async setBusinessInfo () {
    const res = await getBusinessInfoApi();

    if(res && res.data.code === 200) {
      this.businessInfo = res.data.data;
    }
  }

  @action.bound
  async setPassword (data) {
    const res = await setPasswordApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '修改成功',
        duration: 1000
      });
    }
  }

  @action.bound
  async updateBusinessInfo (data) {
    const res = await updateBusinessInfoApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '更新成功',
        duration: 1000
      });
    }
  }
  
}

export default createContext(new CommonStore)
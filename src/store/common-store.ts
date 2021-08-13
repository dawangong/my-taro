/*
 * @Author: your name
 * @Date: 2021-07-22 11:05:32
 * @LastEditTime: 2021-08-13 18:57:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/login.ts
 */
import { observable, action } from 'mobx'
import { createContext } from 'react';
import { registerApi, loginApi, logoutApi, setPasswordApi, getBusinessInfoApi, updateBusinessInfoApi, getPosterApi } from '../api/common-api';
import Taro from '@tarojs/taro'
import { isChinese } from '../utils/tools'


class CommonStore {
  @observable public businessInfo: any = {};
  @observable public poster: string = '';

  @action.bound
  async register (data) {
    if(data.slogan.length < 4) {
      Taro.showToast({
        icon: 'none',
        title: '宣传语至少四个字',
        duration: 1000
      });
      return false;
    }
    if(data.slogan.length > 10) {
      Taro.showToast({
        icon: 'none',
        title: '宣传语至多十个字',
        duration: 1000
      });
      return false;
    }
    if(!isChinese(data.slogan)) {
      Taro.showToast({
        icon: 'none',
        title: '宣传语只支持中文',
        duration: 1000
      });
      return false;
    }
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
    if(data.slogan.length < 4) {
      Taro.showToast({
        icon: 'none',
        title: '宣传语至少四个字',
        duration: 1000
      });
      return false;
    }
    if(data.slogan.length > 10) {
      Taro.showToast({
        icon: 'none',
        title: '宣传语至多十个字',
        duration: 1000
      });
      return false;
    }
    if(!isChinese(data.slogan)) {
      Taro.showToast({
        icon: 'none',
        title: '宣传语只支持中文',
        duration: 1000
      });
      return false;
    }
    const res = await updateBusinessInfoApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '更新成功',
        duration: 1000
      });
    }
  }

  @action.bound
  async getPoster () {
    this.poster = "";
    Taro.showLoading({
      title: '海报生成中...',
    })
    const res = await getBusinessInfoApi();

    setTimeout(() => {
      if(res && res.data.code === 200) {
        this.poster = res.data.data.poster;
        Taro.hideLoading();
      }
    }, 2000)
  }
  
}

export default createContext(new CommonStore)
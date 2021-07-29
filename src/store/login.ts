/*
 * @Author: your name
 * @Date: 2021-07-22 11:05:32
 * @LastEditTime: 2021-07-29 11:27:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/login.ts
 */
import { observable, action } from 'mobx'
import { createContext } from 'react';
import { registerApi, loginApi, logoutApi } from '../api/common-api';
import Taro from '@tarojs/taro'

class LoginStore {
  @observable public mobile: string = '';

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
      this.mobile = res.data.data.mobile;
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
      this.mobile = '';
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
  
}

export default createContext(new LoginStore)
/*
 * @Author: your name
 * @Date: 2021-07-22 11:05:32
 * @LastEditTime: 2021-07-28 17:36:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/store/login.ts
 */
import { observable, action } from 'mobx'
import { createContext } from 'react';
import { registerApi, loginApi } from '../api/common-api';
import Taro from '@tarojs/taro'

class LoginStore {
  // @observable public counter: number = 0;

  @action.bound
  async register (data) {
    const res = await registerApi(data);
    if(res) {
      Taro.redirectTo({
      url: '/pages/center/center'
      })
    }
  }

  @action.bound
  async login (data) {
    const res = await loginApi(data);
    if(res) {
      Taro.redirectTo({
      url: '/pages/center/center'
      })
    }
  }
}

export default createContext(new LoginStore)
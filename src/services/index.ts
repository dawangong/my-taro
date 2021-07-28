/*
 * @Author: your name
 * @Date: 2021-01-28 14:32:52
 * @LastEditTime: 2021-07-28 19:43:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/services/index.ts
 */
import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './http-status'
import { base } from './config'
import { getCurrentPage } from '../utils/tools'
import _ from 'underscore'

const http = {
  defaultContentType: 'application/json',
  check() {
    const token = Taro.getStorageSync('token');
    const page = getCurrentPage();
    if(!token) {
      if(page !== 'pages/login/login'){
        Taro.showToast({
          icon: 'none',
          title: '请您先登录',
          duration: 1000
        });
        setTimeout(() => {
          Taro.redirectTo({
            url: '/pages/login/login'
          });
        }, 1000)
      }
      return '';
    }
    return token;
  },
  interceptor(data) {
    const required = data.required || [];
    delete data.required;

    if(required.some(key => _.isEmpty(data[key]))) {
      Taro.showToast({
        icon: 'none',
        title: '必填项未填写完整',
        duration: 1000
      })
      return false;
    } else {
      return true;
    }
  },
  clear(data) {
    for(const key in data) {
      if(data.hasOwnProperty(key)) {
        if(_.isEmpty(data[key])) {
          delete data[key];
        }
      }
    }
  },
  baseOptions({ params, method }) {
    const page = getCurrentPage();
    const { url, data, contentType } = params;

    const token = this.check();
    if(!token && page !== 'pages/login/login') {
      return false;
    }
    if(!this.interceptor(data)) return false;
    this.clear(data);
    
    const options = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base + url,
      data: data,
      method,
      header: { 'content-type': contentType || this.defaultContentType, 'token': token },
      success(res) {
        return res.data;
      },
      fail(e) {
        console.error('api错误', e.errMsg);
        Taro.showToast({
          icon: 'none',
          title: e.errMsg,
          duration: 1000
        });
      }
    }
    return Taro.request(options)
  },
  get(params) {
    return this.baseOptions({
      params,
      method: 'GET',
    })
  },
  post(params) {
    return this.baseOptions({
      params, 
      method: 'POST',
    })
  }
}

export default http;

/*
 * @Author: your name
 * @Date: 2021-01-28 14:32:52
 * @LastEditTime: 2021-08-23 11:47:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/services/index.ts
 */
import Taro from '@tarojs/taro'
// import { HTTP_STATUS } from './http-status'
import { base } from './config'
import { getCurrentPage } from '../utils/tools'
import _ from 'underscore'
import { isObservable, toJS } from 'mobx';

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

    if(required.some(key => typeof data[key] === 'number' ? false : _.isEmpty(isObservable(data[key]) ? toJS(data[key]) : data[key]))) {
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
        if(typeof data[key] === 'number' ? false : _.isEmpty(isObservable(data[key]) ? toJS(data[key]) : data[key])) {
          delete data[key];
        }
      }
    }
  },
  baseOptions({ params, method }) {
    const page = getCurrentPage();
    const { url, data = '', contentType } = params;

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
      header: { 'content-type': contentType || this.defaultContentType, 'X-Token': token },
      success(res) {
        if(res.data.code !== 200) {
          Taro.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 1000
          });
        }
        if(res.data.code === 5000000) {
          Taro.removeStorageSync('token');
          setTimeout(() => {
            Taro.redirectTo({
              url: '/pages/login/login'
            })
          }, 1000)
        }
        if(res.data.code === 5000002) {
          setTimeout(() => {
            Taro.reLaunch({
              url: '/pages/center/center'
            })
          }, 1000)
        }
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

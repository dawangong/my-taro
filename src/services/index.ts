/*
 * @Author: your name
 * @Date: 2021-01-28 14:32:52
 * @LastEditTime: 2021-07-28 18:23:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/services/index.ts
 */
import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './http-status'
import { base } from './config'
import { logError } from '../utils/log'
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
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在', null)
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题', null)
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问', null)
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
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

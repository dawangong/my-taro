/*
 * @Author: your name
 * @Date: 2021-01-28 14:32:52
 * @LastEditTime: 2021-08-12 16:23:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/utils/tools.ts
 */
import Taro from '@tarojs/taro'

export const isChinese = (str) => {
  const reg = /^[\u4e00-\u9fa5]+$/;
  return reg.test(str);
}

export const handleName = (str) => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
}

export const emoj2str = (str) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}
/*获取当前页url*/
export const getCurrentPage = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage ? currentPage.route : '';
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

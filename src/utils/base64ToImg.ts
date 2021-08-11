/*
 * @Author: your name
 * @Date: 2021-08-11 16:21:47
 * @LastEditTime: 2021-08-11 16:50:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/utils/base64ToImg.ts
 */
import Taro from '@tarojs/taro'

const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名
const fsm = Taro.getFileSystemManager();

export default function base64src(base64data, cb?) {
  const number = Math.random();
  const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}${number}.png`;
  fsm.writeFile({
    filePath,
    data: base64data,
    encoding: 'base64',
    success() {
      cb && cb(filePath);
    },
    fail() {
      return (new Error('ERROR_BASE64SRC_WRITE'));
    },
  });
};

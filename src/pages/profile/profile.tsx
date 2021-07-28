/*
 * @Author: your name
 * @Date: 2021-07-22 14:42:40
 * @LastEditTime: 2021-07-28 18:14:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/profile/profile.tsx
 */
import './profile.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
// import counterStore from '../../store/counter'


interface Props {}

const Profile: React.FC<Props> = (props: Props) => {

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-profile'>
      <AtList>
        <AtListItem
          title='测试商户'
          arrow='right'
          extraText='编辑'
          thumb='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
        />
        <AtListItem
          title='商户信息'
          arrow='right'
          onClick={() => Taro.navigateTo({
            url: '/pages/business-info/business-info'
          })}
        />
        <AtListItem
          title='退出登录'
          extraText='更换账号'
          arrow='right'
          onClick={() => {
            Taro.reLaunch({
              url: '/pages/login/login'
            })
            Taro.removeStorageSync('token');
          }}
        />
      </AtList>
    </View>
  )
};

export default observer(Profile)

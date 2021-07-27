/*
 * @Author: your name
 * @Date: 2021-07-26 17:05:54
 * @LastEditTime: 2021-07-27 17:35:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/split-detail/split-detail.tsx
 */
import './split-detail.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtCard } from 'taro-ui'
// import counterStore from '../../store/counter'



interface Props {}

const SplitDetail: React.FC<Props> = (props: Props) => {

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
    <View className='page-split-detail'>
      <View className='page-coupon-edit__bg'></View>
      <View className='page-coupon-edit__content'>
        <AtCard
          className='page-coupon-edit__card'
          title='基本信息'
        >
        </AtCard>
        <AtCard
          className='page-coupon-edit__card'
          title='扫码详情'
        >
        </AtCard>
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => {}}>下载二维码</AtButton>
      </View>
    </View>
  )
};

export default observer(SplitDetail)

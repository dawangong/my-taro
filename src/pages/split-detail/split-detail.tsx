/*
 * @Author: your name
 * @Date: 2021-07-26 17:05:54
 * @LastEditTime: 2021-07-28 10:57:51
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
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtList, AtListItem } from 'taro-ui'
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
          <AtList hasBorder={false}>
            <AtListItem title='裂变ID' extraText='1666' />
            <AtListItem title='裂变昵称' extraText='111' />
            <AtListItem title='用户昵称' extraText='111' />
            <AtListItem title='发布次数' extraText='111' />
            <AtListItem title='创建时间' extraText='2021.09.01' />
          </AtList>
        </AtCard>
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => Taro.navigateTo({
              url: '/pages/split-edit/split-edit'
            })}>编辑</AtButton>
        <AtCard
          className='page-coupon-edit__card'
          title='扫码详情'
        >
          <View className="img">
            <Image
              mode='widthFix'
              src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
            />
          </View>
        </AtCard>
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => {}}>下载二维码</AtButton>
      </View>
    </View>
  )
};

export default observer(SplitDetail)

/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-13 16:33:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './index.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
// import commonStore from '../../store/common-store'

interface Props {}

const Index: React.FC<Props> = (props: Props) => {

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
    <View className='page-index'>
      content
    </View>
  )
};

export default observer(Index)

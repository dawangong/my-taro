import './video-list.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
// import counterStore from '../../store/counter'



interface Props {}

const VideoList: React.FC<Props> = (props: Props) => {

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
    <View className='page-video-list'>
      content
    </View>
  )
};

export default observer(VideoList)
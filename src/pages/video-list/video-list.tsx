/*
 * @Author: your name
 * @Date: 2021-07-26 17:07:21
 * @LastEditTime: 2021-07-28 14:28:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/video-list/video-list.tsx
 */
import './video-list.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtInput, AtButton, AtIcon } from 'taro-ui'
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
      <ScrollView
        className='scroll-view'
        scrollY
        scrollWithAnimation
        scrollTop={0}
        style={{ height: "100%" }}
        lowerThreshold={20}
        upperThreshold={20}
        // onScrollToUpper
      >
        {
          [0,1,2,3].map(() => 
          <View
            className="activity-card"
            onClick={() => Taro.navigateTo({
              url: '/pages/video-edit/video-edit'
            })}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">视频</View>
                <View>名字</View>
                <View className="activity-card-del" onClick={(e: any) => {
                  e.stopPropagation();
                  Taro.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000
                  })
                }}>
                  <AtIcon value='trash' size='22' color="#ccc" ></AtIcon>
                </View>
              </View>
              <View className="activity-card-content">
                <View className="activity-card-field">
                  <View>视频数量:</View>
                  <View>111</View>
                </View>
                <View className="activity-card-field">
                  <View>创建时间:</View>
                  <View>111</View>
                </View>
              </View>
            </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => Taro.navigateTo({
            url: '/pages/video-edit/video-edit'
          })}>新增视频</AtButton>
      </View>
    </View>
  )
};

export default observer(VideoList)

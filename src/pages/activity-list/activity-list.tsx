/*
 * @Author: your name
 * @Date: 2021-07-26 17:06:10
 * @LastEditTime: 2021-07-27 11:22:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/activity-list/activity-list.tsx
 */
import './activity-list.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtInput, AtButton, AtCard } from 'taro-ui'
// import counterStore from '../../store/counter'



interface Props {}

const ActivityList: React.FC<Props> = (props: Props) => {

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
    <View className='page-activity-list'>
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
              url: '/pages/activity-edit/activity-edit'
            })}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">大转盘</View>
                <View>名字</View>
              </View>
              <View className="activity-card-content">
                <View className="activity-card-field">
                  <View>奖品数量:</View>
                  <View>111</View>
                </View>
                <View className="activity-card-field">
                  <View>活动时间:</View>
                  <View>111</View>
                </View>
              </View>
            </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => Taro.navigateTo({
            url: '/pages/activity-edit/activity-edit'
          })}>新增活动</AtButton>
      </View>
    </View>
  )
};

export default observer(ActivityList)

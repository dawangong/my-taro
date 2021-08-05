/*
 * @Author: your name
 * @Date: 2021-07-26 17:06:10
 * @LastEditTime: 2021-08-05 16:36:45
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
import { AtInput, AtButton, AtCard, AtIcon } from 'taro-ui'
import activityStore from '../../store/activity-store'
import tools from 'highly-tools';



interface Props {}

const ActivityList: React.FC<Props> = (props: Props) => {

  const { list, getActivityList, removeActivity } = useContext(activityStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getActivityList({
      page: 1,
      size: 10000
    });
  })

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
          list.map((item: any) => 
          <View
            className="activity-card"
            onClick={() => Taro.navigateTo({
              url: `/pages/activity-edit/activity-edit?id=${item.id}`
            })}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">大转盘</View>
                <View>{item.title}</View>
                <View className="activity-card-del" onClick={(e: any) => {
                  e.stopPropagation();
                  removeActivity({
                    id: item.id,
                    required: ['id']
                  })
                }}>
                  <AtIcon value='trash' size='22' color="#ccc" ></AtIcon>
                </View>
              </View>
              <View className="activity-card-content">
                <View className="activity-card-field">
                  <View>奖品数量: </View>
                  <View>{item.prizes.reduce((now, next) => (now + next.num), 0)}</View>
                </View>
                <View className="activity-card-field">
                  <View>活动时间: </View>
                  <View>{tools.toDate(item.start_time, 'yyyy.MM.dd').nowTime} - {tools.toDate(item.end_time, 'yyyy.MM.dd').nowTime}</View>
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

/*
 * @Author: your name
 * @Date: 2021-07-26 17:06:10
 * @LastEditTime: 2021-08-26 12:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/activity-list/activity-list.tsx
 */
import './activity-list.scss'

import React, { useEffect, useContext, useState } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, ScrollView } from '@tarojs/components'
import { AtButton, AtIcon, AtModal } from 'taro-ui'
import activityStore from '../../store/activity-store'
import tools from 'highly-tools';



interface Props {}

const ActivityList: React.FC<Props> = (props: Props) => {

  const { list, getActivityList, removeActivity } = useContext(activityStore);
  const [isOpened, setIsOpened] = useState(false);

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
      <AtModal
        isOpened={isOpened}
        title='提示'
        cancelText='忽略'
        confirmText='新增优惠券'
        onClose={() => {
          setIsOpened(false);
          Taro.navigateTo({
            url: '/pages/activity-edit/activity-edit'
          });
        }}
        onCancel={() => {
          setIsOpened(false);
          Taro.navigateTo({
            url: '/pages/activity-edit/activity-edit'
          });
        }}
        onConfirm={() => {
          setIsOpened(false);
          Taro.navigateTo({
            url: '/pages/coupon-edit/coupon-edit'
          });
        }}
        content='新增活动前,请先确认新增过优惠券.奖品建议至少设置6个,剩余概率均为谢谢惠顾'
      />
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
                <View className="activity-card-name">{item.title}</View>
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
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => setIsOpened(true)}>新增活动</AtButton>
      </View>
    </View>
  )
};

export default observer(ActivityList)

/*
 * @Author: your name
 * @Date: 2021-07-26 17:05:14
 * @LastEditTime: 2021-08-04 16:28:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/split-list/split-list.tsx
 */
import './split-list.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtInput, AtButton, AtIcon } from 'taro-ui'
import splitStore from '../../store/split-store'



interface Props {}

const SplitList: React.FC<Props> = (props: Props) => {

  const { list, getSplitList } = useContext(splitStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getSplitList({
      page: 1,
      size: 10000
    })
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-split-list'>
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
          list.map((item: any, index: number) => 
          <View
            className="activity-card"
            onClick={() => Taro.navigateTo({
              url: '/pages/split-detail/split-detail'
            })}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">{item.type === 1 ? '活动' : '优惠券'}</View>
                <View>{item.name}</View>
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
                <View className="img">
                  <Image
                    mode='widthFix'
                    src={item.pic}
                  />
                </View>
                <View>
                  <View className="activity-card-field">
                    <View>发布次数:</View>
                    <View>111</View>
                  </View>
                  <View className="activity-card-field">
                    <View>创建时间:</View>
                    <View>111</View>
                  </View>
                </View>
              </View>
            </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => Taro.navigateTo({
            url: '/pages/split-edit/split-edit'
          })}>新增裂变</AtButton>
      </View>
    </View>
  )
};

export default observer(SplitList)

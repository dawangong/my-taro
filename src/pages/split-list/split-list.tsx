/*
 * @Author: your name
 * @Date: 2021-07-26 17:05:14
 * @LastEditTime: 2021-08-06 14:13:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/split-list/split-list.tsx
 */
import './split-list.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, ScrollView, Image } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import splitStore from '../../store/split-store'



interface Props {}

const SplitList: React.FC<Props> = (props: Props) => {

  const { list, getSplitList, removeSplit, clear } = useContext(splitStore);

  const status = ['未知', '通过审核', '未通过审核', '待审核'];

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
              url: `/pages/split-detail/split-detail?id=${item.id}`
            })}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">{item.type === 1 ? '活动' : '优惠券'}</View>
                <View>{item.name}</View>
                <View className="activity-card-del" onClick={(e: any) => {
                  e.stopPropagation();
                  removeSplit({
                    id: item.id,
                    required: ['id'],
                  });
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
                    <View>视频状态:</View>
                    <View>{status[item.status]}</View>
                  </View>
                  {/* <View className="activity-card-field">
                    <View>创建时间:</View>
                    <View>111</View>
                  </View> */}
                </View>
              </View>
            </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => {
           clear();
           Taro.navigateTo({
            url: '/pages/split-edit/split-edit'
          })
         }}>新增裂变</AtButton>
      </View>
    </View>
  )
};

export default observer(SplitList)

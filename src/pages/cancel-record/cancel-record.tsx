/*
 * @Author: your name
 * @Date: 2021-07-27 14:15:22
 * @LastEditTime: 2021-08-26 17:15:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/coupon-list-select/coupon-list-select.tsx
 */
import './cancel-record.scss'

import React, { useEffect, useContext } from 'react'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import couponStore from '../../store/coupon-store'
import tools from 'highly-tools';



interface Props {}

const CancelRecord: React.FC<Props> = (props: Props) => {

  const { offList, offCouponList } = useContext(couponStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    offCouponList({
      page: 1,
      size: 10000,
    });
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-coupon-list'>
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
          offList.map((item: any, index: number) => 
          <View className={`card ${item.type === 2 && 'gift'}`}>
            {
              item.type === 1 ? <View className="card-left">
              <View>{item.coupon_value}元</View>
              <View>满{item.coupon_min}可用</View>
            </View> : <View className="card-left">
              礼品券
            </View>
            }
            <View className="card-right">
                <Text className="card-info">{item.name}</Text>
                <Text className="card-time">有效期: {tools.toDate(item.start_time, 'yyyy.MM.dd').nowTime} - {tools.toDate(item.end_time, 'yyyy.MM.dd').nowTime}</Text>
            </View>
          </View>)
        }
      </ScrollView>
    </View>
  )
};

export default observer(CancelRecord)

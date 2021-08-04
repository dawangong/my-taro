import './coupon-list.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import couponStore from '../../store/coupon-store'
import tools from 'highly-tools';



interface Props {}

const CouponList: React.FC<Props> = (props: Props) => {

  const { list, getCouponList } = useContext(couponStore); 

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getCouponList({
      page: 1,
      size: 10000
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
          list.map((item: any) => 
          <View className={`card ${item.type === 2 && 'gift'}`} onClick={() => Taro.navigateTo({
            url: `/pages/coupon-detail/coupon-detail?coupon=${JSON.stringify(item)}`
          })}>
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
      <View className="add-area">
         <AtButton type='primary' className='page-coupon-list__btn' onClick={() => Taro.navigateTo({
            url: `/pages/coupon-edit/coupon-edit`
          })}>新增优惠券</AtButton>
      </View>
    </View>
  )
};

export default observer(CouponList)

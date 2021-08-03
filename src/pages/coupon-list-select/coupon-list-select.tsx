/*
 * @Author: your name
 * @Date: 2021-07-27 14:15:22
 * @LastEditTime: 2021-08-03 14:35:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/coupon-list-select/coupon-list-select.tsx
 */
import './coupon-list-select.scss'

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
import CouponStore from '../../store/coupon-store'



interface Props {}

const CouponList: React.FC<Props> = (props: Props) => {

  const { prizeItem, update } = useContext(CouponStore);

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
          [{
            coupon_id: 1,
            title: "优惠券1",
          },{
            coupon_id: 2,
            title: "优惠券2",
          },{
            coupon_id: 3,
            title: "优惠券3",
          }].map(item => 
          <View className={`card ${true && 'gift'}`} onClick={() => {
            update({...prizeItem, ...item});
            Taro.navigateBack();
          }}>
            {/* <View className="card-left">
              <View>350元</View>
              <View>满4可用</View>
            </View> */}
            <View className="card-left">
              礼品券
            </View>
            <View className="card-right">
                <Text className="card-info">满30元送350书券</Text>
                <Text className="card-time">有效期: 2021.09.01 - 2021.09.30</Text>
            </View>
          </View>)
        }
      </ScrollView>
    </View>
  )
};

export default observer(CouponList)

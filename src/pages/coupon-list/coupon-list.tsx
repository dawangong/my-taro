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
// import counterStore from '../../store/counter'



interface Props {}

const CouponList: React.FC<Props> = (props: Props) => {

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
          [0,1,2,3].map(() => 
          <View className="card" onClick={() => Taro.navigateTo({
            url: '/pages/coupon-detail/coupon-detail'
          })}>
            <View className="card-left">
              <View>350元</View>
              <View>满4元可用</View>
            </View>
            <View className="card-right">
                <Text className="card-info">满30元送350书券</Text>
                <Text className="card-time">有效期: 2021.09.01 - 2021.09.30</Text>
            </View>
          </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-coupon-list__btn'>新增优惠券</AtButton>
      </View>
    </View>
  )
};

export default observer(CouponList)

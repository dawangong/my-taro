import './coupon-detail.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
// import counterStore from '../../store/counter'



interface Props {}

const CouponDetail: React.FC<Props> = (props: Props) => {

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
    <View className='page-coupon-detail'>
      <View className="card">
        <View className="info">
          <View className="money">10.00元</View>
          <View>满减优惠</View>
          <View className="grey">满200可用</View>
        </View>

        <View className="filed">
          <Text className="title grey">优惠券标题:</Text>
          <Text>满减优惠</Text>
        </View>
        <View className="filed">
          <Text className="title grey">剩余数量:</Text>
          <Text>7</Text>
        </View>
        <View className="filed">
          <Text className="title grey">已领数量:</Text>
          <Text>3</Text>
        </View>
        <View className="filed">
          <Text className="title grey">返佣佣金:</Text>
          <Text>0.01</Text>
        </View>
        <View className="filed">
          <Text className="title grey">可用时间:</Text>
          <Text>2021.06.01 00:00</Text>
        </View>
        <View className="filed">
          <Text className="title grey">截止时间:</Text>
          <Text>2021.09.01 00:00</Text>
        </View>

        <View className='page-coupon-detail__handle'>
          <AtButton type='primary' className='page-coupon-detail__btn'>删除</AtButton>
          <AtButton type='primary' className='page-coupon-detail__btn' onClick={() => Taro.navigateTo({
            url: '/pages/coupon-edit/coupon-edit'
          })}>修改</AtButton>
        </View>
      </View>

      <View className="regular">
        <View> -------------- 卡券规则 --------------- </View>
        <View>1.优惠券只能线下核销使用</View>
        <View>2.优惠券只能在指定日期使用</View>
        <View>3.平台对发放的优惠券有最终解释权</View>
      </View>

    </View>
  )
};

export default observer(CouponDetail)

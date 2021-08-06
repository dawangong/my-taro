/*
 * @Author: your name
 * @Date: 2021-07-23 14:01:33
 * @LastEditTime: 2021-08-05 15:32:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/cancel-coupon/cancel-coupon.tsx
 */
import './cancel-coupon.scss'

import React, { useEffect, useContext, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import couponStore from '../../store/coupon-store'
import { AtInput, AtButton } from 'taro-ui'


interface Props {}

const CancelCoupon: React.FC<Props> = (props: Props) => {

  const { offCoupon } = useContext(couponStore); 
  const [coupon_no, setCoupon_no] = useState('')

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
    <View className='page-cancel-coupon'>
      <View className='page-cancel-coupon__content'>
        <AtInput
            name='coupon_no'
            title='优惠券核销码'
            type='text'
            required
            placeholder='请填写优惠券核销码'
            value={coupon_no}
            border={false}
            onChange={value => setCoupon_no(value)}
          />
      </View>
      <AtButton type='primary' className='page-cancel-coupon__btn' onClick={() => offCoupon({
        coupon_no,
        required: ['coupon_no'],
      })}>核销</AtButton>
      <AtButton type='primary' className='page-cancel-coupon__btn--record' onClick={() => Taro.navigateTo({
        url: '/pages/cancel-record/cancel-record'
      })}>核销记录</AtButton>
    </View>
  )
};

export default observer(CancelCoupon)

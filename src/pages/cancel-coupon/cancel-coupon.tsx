import './cancel-coupon.scss'

import React, { useEffect, useContext, useState } from 'react'
import { View, Text } from '@tarojs/components'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import counterStore from '../../store/counter'
import { AtInput, AtButton } from 'taro-ui'


interface Props {}

const CancelCoupon: React.FC<Props> = (props: Props) => {

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
      <AtButton type='primary' className='page-cancel-coupon__btn'>核销</AtButton>
    </View>
  )
};

export default observer(CancelCoupon)

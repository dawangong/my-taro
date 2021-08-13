/*
 * @Author: your name
 * @Date: 2021-07-23 10:47:36
 * @LastEditTime: 2021-08-13 16:22:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/business-info/business-info.tsx
 */
import './business-info.scss'

import React, { useEffect, useContext, useState } from 'react'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import commonStore from '../../store/common-store'


interface Props {}

const BusinessInfo: React.FC<Props> = (props: Props) => {

  const { businessInfo, updateBusinessInfo, setBusinessInfo } = useContext(commonStore);

  const [slogan, setSlogan] = useState(businessInfo.slogan)
  const [address, setAddress] = useState(businessInfo.address)

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    setBusinessInfo();
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-business-info'>
      <View className='page-business-info__bg'></View>
      <View className='page-business-info__content'>
        <AtInput
          name='address'
          title='地址'
          type='text'
          required
          placeholder='请填写地址'
          value={address}
          border={false}
          onChange={value => setAddress(value)}
        />
        <AtInput
          name='slogan'
          title='宣传语'
          type='text'
          required
          placeholder='请填写宣传语'
          value={slogan}
          border={false}
          onChange={value => setSlogan(value)}
        />
      </View>
      <AtButton type='primary' className='page-business-info__btn' onClick={() => {
        updateBusinessInfo({
          slogan,
          address,
          required: ['address', 'slogan']
        });
        setBusinessInfo();
      }}>更新</AtButton>
    </View>
  )
};

export default observer(BusinessInfo)

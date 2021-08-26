/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-26 15:26:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './get-money.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtNoticebar } from 'taro-ui'
import proxyStore from '../../../store/proxy-store'

interface Props {}

const GetMoney: React.FC<Props> = (props: Props) => {

  const { drawing } = useContext(proxyStore); 
  const [info, setInfo] = useState({
    price: '',
    zfb: '',
    name: '',
  })

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
    <View className='page-get-money'>
      <View className='page-cancel-coupon__content'>
          <AtInput
            name='price'
            title='提现金额'
            type='text'
            required
            placeholder='请填写提现金额'
            value={info.price}
            border={false}
            onChange={value => setInfo({ ...info ,price: value })}
          >
            <Text>元</Text>
          </AtInput>

          <AtInput
            name='zfb'
            title='支付宝账户'
            type='text'
            required
            placeholder='请填写支付宝账户'
            value={info.zfb}
            border={false}
            onChange={value => setInfo({ ...info ,zfb: value })}
          />

          <AtInput
            name='name'
            title='支付宝名称'
            type='text'
            required
            placeholder='请填写支付宝名称'
            value={info.name}
            border={false}
            onChange={value => setInfo({ ...info ,name: value })}
          />
      </View>
      <AtNoticebar icon='volume-plus'>
        提现声明: 请您仔细核查填写的支付宝账户和名称!
      </AtNoticebar>
      <AtNoticebar icon='volume-plus'>
        提现声明: 如因自身填写错误,导致的提现失败或出错,本软件概不负责.
      </AtNoticebar>
      <AtNoticebar icon='volume-plus'>
        提现声明: 提现可能会存在到账延迟,请您在申请提现后耐心等待.
      </AtNoticebar>
      <AtButton type='primary' className='page-cancel-coupon__btn' onClick={() => drawing({
        ...info,
        price: Number(info.price),
        required: ['price', 'zfb', 'name'],
      })}>提现</AtButton>
    </View>
  )
};

export default observer(GetMoney)

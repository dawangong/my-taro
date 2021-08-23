/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-23 14:09:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './deposit-guide.scss'

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
import commonStore from '../../../store/common-store'

interface Props {}

const DepositGuide: React.FC<Props> = (props: Props) => {

  const { goDeposit } = useContext(commonStore); 
  const [card_no, setCard_no] = useState('')

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
    <View className='page-deposit-guide'>
      <View className='page-cancel-coupon__content'>
        <AtInput
            name='card_no'
            title='卡密'
            type='text'
            required
            placeholder='请填写卡密'
            value={card_no}
            border={false}
            onChange={value => setCard_no(value)}
          />
      </View>
      <AtNoticebar icon='volume-plus'>
        卡密需要在官方指定的淘宝店购买.请复制“www.baidu.com”后,打开淘宝App,或通过链接“www.baidu.com”打开淘宝网购买.
      </AtNoticebar>
      <AtButton type='primary' className='page-cancel-coupon__btn' onClick={() => goDeposit({
        card_no,
        required: ['card_no'],
      })}>充值</AtButton>
    </View>
  )
};

export default observer(DepositGuide)

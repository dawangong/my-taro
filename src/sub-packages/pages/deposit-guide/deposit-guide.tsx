/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-23 19:18:47
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
import proxyStore from '../../../store/proxy-store'

interface Props {}

const DepositGuide: React.FC<Props> = (props: Props) => {

  const type = Taro.getStorageSync('type');
  const store = type === 1 ? proxyStore : commonStore
  const { goDeposit } = useContext(store); 
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
        卡密需要在官方指定的淘宝店购买.请长按链接复制后,打开淘宝App或浏览器访问购买.
      </AtNoticebar>
      <AtNoticebar icon='volume-plus'>
        淘宝App引导链接: <Text selectable >www.baidu.com</Text>
      </AtNoticebar>
      <AtNoticebar icon='volume-plus'>
        浏览器访问链接: <Text selectable >www.baidu.com</Text>
      </AtNoticebar>
      <AtButton type='primary' className='page-cancel-coupon__btn' onClick={() => goDeposit({
        card_no,
        required: ['card_no'],
      })}>充值</AtButton>
    </View>
  )
};

export default observer(DepositGuide)

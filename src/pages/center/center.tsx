import './center.scss'

import React, { useEffect, useContext } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import counterStore from '../../store/counter'
import { AtDivider, AtAvatar, AtIcon, AtGrid } from 'taro-ui'


interface Props {}

const Center: React.FC<Props> = (props: Props) => {

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
    <View className='page-center'>
      <View className='page-center__info' onClick={() => Taro.navigateTo({
        url: '/pages/profile/profile'
      })
    }>
        <AtAvatar className='page-center__info-avatar' circle image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'></AtAvatar>
        <Text>测试商户</Text>
        <AtIcon value='chevron-right' size='30' color='#c7c7c7' ></AtIcon>
      </View>
      <AtDivider height="1" lineColor="#f5f5f5" />
      <View className='page-center__base'>
      <AtGrid hasBorder={false} columnNum={4} data={
        [
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              value: '卡券列表'
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '核销卡券'
            }
          ]
        } />
      </View>
      <View className='page-center__service'>
        <View className='page-center__service__title'>常用服务</View>
        <View className='page-center__service-content'>
          <View className='page-center__service-item page-center__service-item--active'>
            <Text className='page-center__service__desc'>营销活动</Text>
          </View>
          <View className='page-center__service-item page-center__service-item--video'>
            <Text className='page-center__service__desc'>视频素材</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

export default observer(Center)

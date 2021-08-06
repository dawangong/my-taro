/*
 * @Author: your name
 * @Date: 2021-07-21 18:48:23
 * @LastEditTime: 2021-08-06 14:43:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/center/center.tsx
 */
import './center.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, OpenData } from '@tarojs/components'
import { AtDivider, AtAvatar, AtIcon, AtGrid } from 'taro-ui'
import commonStore from '../../store/common-store'
import tools from 'highly-tools';


interface Props {}

const Center: React.FC<Props> = (props: Props) => {

  const { businessInfo, setBusinessInfo } = useContext(commonStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {
    setBusinessInfo();
  })

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
      })}>
        <View className='page-center__info-avatar'>
          <OpenData className='avatar' type='userAvatarUrl'/>
        </View>
        <View>
          <View>{businessInfo.name}</View>
          <View style={{ fontSize: '10px', color: '#9a9a9a' }}>有效期: {businessInfo.end_time && tools.toDate(businessInfo.end_time, 'yyyy.MM.dd hh:mm:ss').nowTime}</View>
        </View>
        <AtIcon value='chevron-right' size='30' color='#ccc' ></AtIcon>
      </View>
      <AtDivider height="1" lineColor="#f5f5f5" />
      <View className='page-center__base'>
        <AtGrid 
          onClick={(item: object, index: number) => {
            const config = ["/pages/coupon-list/coupon-list", "/pages/cancel-coupon/cancel-coupon"]
            Taro.navigateTo({
              url: config[index]
            })
          }}    
          hasBorder={false} 
          columnNum={4} 
          data={
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
          } 
        />
      </View>
      <View className='page-center__service'>
        <View className='page-center__service__title'>常用服务</View>
        <View className='page-center__service-content'>
          <View className='page-center__service-item page-center__service-item--active' onClick={() => Taro.navigateTo({
              url: '/pages/activity-list/activity-list'
            })}>
            <Text className='page-center__service__desc'>营销活动</Text>
          </View>
          <View className='page-center__service-item page-center__service-item--split' onClick={() => Taro.navigateTo({
              url: '/pages/split-list/split-list'
            })}>
            <Text className='page-center__service__desc'>智能裂变</Text>
          </View>
          <View className='page-center__service-item page-center__service-item--video' onClick={() => Taro.navigateTo({
              url: '/pages/video-list/video-list'
            })}>
            <Text className='page-center__service__desc'>视频素材</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

export default observer(Center)

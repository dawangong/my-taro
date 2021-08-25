/*
 * @Author: your name
 * @Date: 2021-07-21 18:48:23
 * @LastEditTime: 2021-08-25 13:35:43
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
import { AtDivider, AtIcon, AtGrid } from 'taro-ui'
import commonStore from '../../store/common-store'
import proxyStore from '../../store/proxy-store'
import tools from 'highly-tools';

import coupon from '../../images/youhuiquan.png';
import useCoupon from '../../images/hexiaoyouhuiquan.png';
import entry from '../../images/chongzhi.png';
import record from '../../images/chongzhijilu.png';


interface Props {}

const Center: React.FC<Props> = (props: Props) => {

  const type = Taro.getStorageSync('type');
  const store = type === 1 ? proxyStore : commonStore
  const { businessInfo, setBusinessInfo } = useContext(store);
  const gridData = type === 1 ? [
    {
      image: entry,
      value: '充值入口'
    },
    {
      image: record,
      value: '充值记录'
    }
  ] : [
    {
      image: coupon,
      value: '卡券列表'
    },
    {
      image: useCoupon,
      value: '核销卡券'
    },
    {
      image: entry,
      value: '充值入口'
    },
    {
      image: record,
      value: '充值记录'
    }
  ]

  const config = type === 1 ? ["/sub-packages/pages/deposit-guide/deposit-guide", "/sub-packages/pages/deposit-record/deposit-record"] : ["/pages/coupon-list/coupon-list", "/pages/cancel-coupon/cancel-coupon", "/sub-packages/pages/deposit-guide/deposit-guide", "/sub-packages/pages/deposit-record/deposit-record"]

  const { version } = Taro.getAccountInfoSync().miniProgram;

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
          {type === 1 && <View className="money">总佣金: {businessInfo.total_commission/100}元</View>}
          {type === 1 && <View className="money">剩余佣金: {businessInfo.commission/100}元</View>}
          <View style={{ fontSize: '10px', color: '#9a9a9a' }}>有效期: {businessInfo.end_time && tools.toDate(businessInfo.end_time, 'yyyy.MM.dd hh:mm:ss').nowTime}</View>
        </View>
        <AtIcon value='chevron-right' size='30' color='#ccc' ></AtIcon>
      </View>
      <AtDivider height="1" lineColor="#f5f5f5" />
      <View className='page-center__base'>
        <AtGrid 
          onClick={(item: object, index: number) => {
            Taro.navigateTo({
              url: config[index]
            })
          }}    
          hasBorder={false} 
          columnNum={4} 
          data={gridData} 
        />
      </View>
      <View className='page-center__service'>
        <View className='page-center__service__title'>常用服务</View>
        {
          type === 1 ? <View className='page-center__service-content'>
          <View className='page-center__service-item page-center__service-item--active' onClick={() => Taro.navigateTo({
              url: '/sub-packages/pages/proxy-code/proxy-code'
            })}>
            <Text className='page-center__service__desc'>代理二维码</Text>
          </View>
          <View className='page-center__service-item page-center__service-item--split' onClick={() => Taro.navigateTo({
              url: '/sub-packages/pages/business-code/business-code'
            })}>
            <Text className='page-center__service__desc'>商家二维码</Text>
          </View>
          <View className='page-center__service-item page-center__service-item--video' onClick={() => Taro.navigateTo({
              url: '/sub-packages/pages/money-list/money-list'
            })}>
            <Text className='page-center__service__desc'>佣金列表</Text>
          </View>
        </View> : <View className='page-center__service-content'>
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
              url: '/sub-packages/pages/video-list/video-list'
            })}>
            <Text className='page-center__service__desc'>视频素材</Text>
          </View>
          <View className='page-center__service-item page-center__service-item--poster' onClick={() => Taro.navigateTo({
              url: '/sub-packages/pages/poster/poster'
            })}>
            <Text className='page-center__service__desc'>推广海报</Text>
          </View>
        </View>
        }
      </View>

      {
        version && <View className='page-center__version'>
        当前版本: {version}
      </View>
      }
        
    </View>
  )
};

export default observer(Center)

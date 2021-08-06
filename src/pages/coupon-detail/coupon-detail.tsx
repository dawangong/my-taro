import './coupon-detail.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import tools from 'highly-tools';
import couponStore from '../../store/coupon-store'



interface Props {}

const CouponDetail: React.FC<Props> = (props: Props) => {

  const router = useRouter();
  //@ts-ignore
  const data = JSON.parse(router.params.coupon);
  const { removeCoupon } = useContext(couponStore); 

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
          {data.type === 1 ? <View className="money">{data.coupon_value}元</View> : <View></View>}
          <View>{data.name}</View>
          {data.type === 1 ? <View className="grey">满{data.coupon_min}可用</View> : <View></View>}
        </View>

        <View className="filed">
          <Text className="title grey">优惠券标题:</Text>
          <Text>{data.name}</Text>
        </View>
        <View className="filed">
          <Text className="title grey">数量:</Text>
          <Text>{data.num}</Text>
        </View>
        {
          data.type === 2 && <View className="filed">
          <Text className="title grey">说明:</Text>
          <Text>{data.content}</Text>
        </View>
        }
        {/* <View className="filed">
          <Text className="title grey">已领数量:</Text>
          <Text>3</Text>
        </View>
        <View className="filed">
          <Text className="title grey">返佣佣金:</Text>
          <Text>0.01</Text>
        </View> */}
        <View className="filed">
          <Text className="title grey">开始时间:</Text>
          <Text>{tools.toDate(data.start_time, 'yyyy.MM.dd').nowTime}</Text>
        </View>
        <View className="filed">
          <Text className="title grey">结束时间:</Text>
          <Text>{tools.toDate(data.end_time, 'yyyy.MM.dd').nowTime}</Text>
        </View>

        <View className='page-coupon-detail__handle'>
          <AtButton type='primary' className='page-coupon-detail__btn' onClick={() => removeCoupon({
            id: data.id
          })}>删除</AtButton>
          <AtButton type='primary' className='page-coupon-detail__btn' onClick={() => Taro.navigateTo({
            url: `/pages/coupon-edit/coupon-edit?coupon=${JSON.stringify(data)}`
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

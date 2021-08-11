/*
 * @Author: your name
 * @Date: 2021-07-27 14:15:22
 * @LastEditTime: 2021-08-11 16:08:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/coupon-list-select/coupon-list-select.tsx
 */
import './coupon-list-select.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import couponStore from '../../../store/coupon-store'
import activityStore from '../../../store/activity-store'
import tools from 'highly-tools';
import splitStore from '../../../store/split-store'



interface Props {}

const CouponList: React.FC<Props> = (props: Props) => {

  const { list, getCouponList } = useContext(couponStore);
  const { prizeItem, update } = useContext(activityStore);
  const { updateId } = useContext(splitStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getCouponList({
      page: 1,
      size: 10000
    });
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-coupon-list'>
      <ScrollView
        className='scroll-view'
        scrollY
        scrollWithAnimation
        scrollTop={0}
        style={{ height: "100%" }}
        lowerThreshold={20}
        upperThreshold={20}
        // onScrollToUpper
      >
        {
          list.map((item: any, index: number) => 
          <View className={`card ${item.type === 2 && 'gift'}`} onClick={() => {
            update({...prizeItem, ...{
              coupon_id: item.id,
              title: item.name,
              num: item.num,
              activity_sort: index,
            }});
            updateId(item.id, item.name)
            Taro.navigateBack();
          }}>
            {
              item.type === 1 ? <View className="card-left">
              <View>{item.coupon_value}元</View>
              <View>满{item.coupon_min}可用</View>
            </View> : <View className="card-left">
              礼品券
            </View>
            }
            <View className="card-right">
                <Text className="card-info">{item.name}</Text>
                <Text className="card-time">有效期: {tools.toDate(item.start_time, 'yyyy.MM.dd').nowTime} - {tools.toDate(item.end_time, 'yyyy.MM.dd').nowTime}</Text>
            </View>
          </View>)
        }
      </ScrollView>
    </View>
  )
};

export default observer(CouponList)

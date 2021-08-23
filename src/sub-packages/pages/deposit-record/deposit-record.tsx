/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-23 19:25:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './deposit-record.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import commonStore from '../../../store/common-store'
import proxyStore from '../../../store/proxy-store'
import tools from 'highly-tools';



interface Props {}

const DepositRecord: React.FC<Props> = (props: Props) => {

  const type = Taro.getStorageSync('type');
  const store = type === 1 ? proxyStore : commonStore
  const { depositList, getDepositList } = useContext(store);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getDepositList({
      page: 1,
      size: 10000
    });
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-deposit-record'>
      <ScrollView
        className='scroll-view'
        scrollY
        scrollWithAnimation
        scrollTop={0}
        style={{ height: "100%" }}
        lowerThreshold={20}
        upperThreshold={20}
      >
        {
          depositList.map((item: any) => 
          <View className="activity-card">
              <View className="activity-card-header">
                <View className="activity-card-icon">充值订单</View>
                <View className="activity-card-name">{item.order_no}</View>
              </View>
              <View className="activity-card-content">
                <View className="activity-card-field">
                  <View>充值金额: </View>
                  <View>{item.sell_price / 100}元</View>
                </View>
                <View className="activity-card-field">
                  <View>充值时长: </View>
                  <View>{item.month}个月</View>
                </View>
                <View className="activity-card-field">
                  <View>充值时效: </View>
                  <View>{tools.toDate(item.start_time, 'yyyy.MM.dd').nowTime} - {tools.toDate(item.end_time, 'yyyy.MM.dd').nowTime}</View>
                </View>
              </View>
            </View>)
        }
      </ScrollView>
    </View>
  )
};

export default observer(DepositRecord)

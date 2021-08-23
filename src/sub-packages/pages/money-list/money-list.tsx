/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-23 19:48:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './money-list.scss'

import React, { useEffect, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from '@tarojs/components'
import proxyStore from '../../../store/proxy-store'
// import tools from 'highly-tools';



interface Props {}

const MoneyList: React.FC<Props> = (props: Props) => {

  const { moneyList, getMoneyList } = useContext(proxyStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getMoneyList({
      page: 1,
      size: 10000
    });
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-money-list'>
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
          moneyList.map((item: any) => 
          <View className="activity-card">
              <View className="activity-card-header">
                <View className="activity-card-icon">订单号</View>
                <View className="activity-card-name">{item.order_no}</View>
              </View>
              <View className="activity-card-content">
              <View className="activity-card-field">
                  <View>充值来源: </View>
                  <View>{item.type === 1 ? '代理' : '商家'}</View>
                </View>
                <View className="activity-card-field">
                  <View>充值名称: </View>
                  <View>{item.name}</View>
                </View>
                <View className="activity-card-field">
                  <View>售卖价格: </View>
                  <View>{item.sell_price / 100}元</View>
                </View>
                <View className="activity-card-field">
                  <View>佣金金额: </View>
                  <View>{item.commission / 100}元</View>
                </View>
                <View className="activity-card-field">
                  <View>充值时长: </View>
                  <View>{item.month}个月</View>
                </View>
              </View>
            </View>)
        }
      </ScrollView>
    </View>
  )
};

export default observer(MoneyList)

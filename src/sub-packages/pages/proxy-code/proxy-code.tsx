/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-23 19:32:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './proxy-code.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Image } from '@tarojs/components'
import proxyStore from '../../../store/proxy-store'

interface Props {}

const ProxyCode: React.FC<Props> = (props: Props) => {

  const { businessInfo } = useContext(proxyStore);

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
    <View className='page-proxy-code'>
      <Image
        mode='widthFix'
        src={businessInfo.agent_qr_code}
        onClick={e => {
          e.stopPropagation();
          Taro.previewImage({
            current: businessInfo.agent_qr_code, // 当前显示图片的http链接
            urls: [businessInfo.agent_qr_code] // 需要预览的图片http链接列表
          })
        }}
      />
    </View>
  )
};

export default observer(ProxyCode)

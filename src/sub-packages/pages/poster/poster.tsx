/*
 * @Author: wh
 * @Date: 2021-07-22 10:36:09
 * @LastEditTime: 2021-08-13 18:39:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/template/page/index.tsx
 */
import './poster.scss'

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
import commonStore from '../../../store/common-store'

interface Props {}

const Poster: React.FC<Props> = (props: Props) => {

  const { poster, getPoster } = useContext(commonStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {
    getPoster();
  })

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-poster'>
      <Image
        mode='widthFix'
        src={poster}
        onClick={e => {
          e.stopPropagation();
          Taro.previewImage({
            current: poster, // 当前显示图片的http链接
            urls: [poster] // 需要预览的图片http链接列表
          })
        }}
      />
    </View>
  )
};

export default observer(Poster)

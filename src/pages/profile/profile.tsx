import './profile.scss'

import React, { useEffect, useContext } from 'react'
import { View, Button, Text } from '@tarojs/components'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import counterStore from '../../store/counter'
import { AtDivider, AtAvatar, AtIcon, AtGrid, AtList, AtListItem } from 'taro-ui'


interface Props {}

const Profile: React.FC<Props> = (props: Props) => {

  // const {counter, increment, decrement, incrementAsync } = useContext(counterStore);

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
    <View className='page-profile'>
      <AtList>
        <AtListItem
          title='测试商户'
          arrow='right'
          extraText='编辑'
          thumb='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
        />
        <AtListItem
          title='商户地址'
          arrow='right'
        />
        <AtListItem
          title='退出登录'
          extraText='更换账号'
          arrow='right'
          onClick={() => Taro.reLaunch({
            url: '/pages/login/login'
          })}
        />
      </AtList>
    </View>
  )
};

export default observer(Profile)

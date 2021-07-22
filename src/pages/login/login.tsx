import './login.scss'

import React, { useEffect, useContext } from 'react'
import { View } from '@tarojs/components'
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import loginStore from '../../store/login'


interface Props {}

const Login: React.FC<Props> = (props: Props) => {

  const {} = useContext(loginStore);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  //对应 下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-login'>
      
    </View>
  )
};

export default observer(Login)

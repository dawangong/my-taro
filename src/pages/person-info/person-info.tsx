import './person-info.scss'

import React, { useEffect, useContext, useState } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import commonStore from '../../store/common-store'
import proxyStore from '../../store/proxy-store'


interface Props {}

const UserInfo: React.FC<Props> = (props: Props) => {

  const type = Taro.getStorageSync('type');
  const store = type === 1 ? proxyStore : commonStore
  const { setPassword } = useContext(store);

  const [password, setPassworded] = useState('')

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
    <View className='page-user-info'>
      <View className='page-business-info__bg'></View>
      <View className='page-business-info__content'>
        <AtInput
          name='password'
          title='新密码'
          type='password'
          required
          placeholder='请填写新密码'
          value={password}
          border={false}
          onChange={value => setPassworded(value)}
        />
      </View>
      <AtButton type='primary' className='page-business-info__btn' onClick={() => {
        setPassword({
          password,
          required: ['password']
        });
      }}>更新</AtButton>
    </View>
  )
};

export default observer(UserInfo)

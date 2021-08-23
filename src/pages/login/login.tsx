import './login.scss'

import React, { useEffect, useContext, useState } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtInput, AtButton } from 'taro-ui'
import commonStore from '../../store/common-store'
import proxyStore from '../../store/proxy-store'


interface Props {}

const Login: React.FC<Props> = (props: Props) => {

  const tabList = [{ title: '商户登陆' }, { title: '代理登陆' }]

  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [navigationBarHeight, setNavigationBarHeight] = useState(0)

  const [current, setCurrent] = useState(0)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const store = current === 0 ? commonStore : proxyStore;
  const { login } = useContext(store);

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    const { top, height } = Taro.getMenuButtonBoundingClientRect();
    const { statusBarHeight, platform } = Taro.getSystemInfoSync();
    setStatusBarHeight(statusBarHeight);
    let navigationBarHeight;
    if (top && top !== 0 && height && height !== 0) {
      navigationBarHeight = (top - statusBarHeight) * 2 + height - 10;
    } else {
      if (platform === 'android') {
          navigationBarHeight = 48;
        } else {
          navigationBarHeight = 40;
        }
      }
    setNavigationBarHeight(navigationBarHeight);
  })

  // 对应 onHide
  useDidHide(() => {})

  //对应 下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-login'>
      <View style={{paddingTop: `${navigationBarHeight}px`}}>
        <View style={{lineHeight: `${statusBarHeight}px`, textIndent: '20px', fontSize: '16px'}}>登陆</View>
      </View>
      <View className='page-login-content'>
        <View className='page-login-wel'>Welcome</View>
        <AtTabs current={current} tabList={tabList} onClick={(value) => setCurrent(value)}>
          <AtTabsPane current={current} index={0} >
            <AtInput
              name='mobile'
              title='手机号码'
              type='phone'
              required
              value={mobile}
              border={false}
              onChange={value => setMobile(value)}
            />
            <AtInput
              name='password'
              title='密码'
              type='password'
              required
              value={password}
              border={false}
              onChange={value => setPassword(value)}
            />
            <AtButton type='primary' circle className='page-login__btn--login' onClick={() => {
              login({
                mobile,
                password,
                required: ['mobile', 'password']
              })
            }}>登陆
            </AtButton>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
          <AtInput
              name='mobile'
              title='手机号码'
              type='phone'
              required
              value={mobile}
              border={false}
              onChange={value => setMobile(value)}
            />
            <AtInput
              name='password'
              title='密码'
              type='password'
              required
              value={password}
              border={false}
              onChange={value => setPassword(value)}
            />
            <AtButton type='primary' circle className='page-login__btn--login' onClick={() => {
              login({
                mobile,
                password,
                required: ['mobile', 'password']
              })
            }}>登陆
            </AtButton>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  )
};

export default observer(Login)

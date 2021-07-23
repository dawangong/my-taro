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
import loginStore from '../../store/login'


interface Props {}

const Login: React.FC<Props> = (props: Props) => {

  const [current, setCurrent] = useState(0)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
 
  const [id, setId] = useState('')
  const [slogan, setSlogan] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessMobile, setBusinessMobile] = useState('')
  const [businessPassword, setBusinessPassword] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const tabList = [{ title: '登陆' }, { title: '注册' }]
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
      <View className='page-login-content'>
        <View className='page-login-wel'>Welcome</View>
        <AtTabs current={current} tabList={tabList} onClick={(value) => setCurrent(value)}>
          <AtTabsPane current={current} index={0} >
            <AtInput
              name='mobile'
              title='手机号码'
              type='phone'
              required
              // placeholder='请填写手机号码'
              value={mobile}
              border={false}
              onChange={value => setMobile(value)}
            />
            <AtInput
              name='password'
              title='密码'
              type='password'
              required
              // placeholder='请填写密码'
              value={password}
              border={false}
              onChange={value => setPassword(value)}
            />
            <AtButton type='primary' circle className='page-login__btn--login' onClick={() => Taro.navigateTo({
              url: '/pages/center/center'
            })}>登陆
            </AtButton>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <AtInput
                name='id'
                title='代理ID'
                // placeholder='代理ID'
                type='text'
                value={id}
                border={false}
                onChange={value => setId(value)}
            />
            <AtInput
              name='slogan'
              title='宣传语'
              // placeholder='宣传语'
              type='text'
              value={slogan}
              border={false}
              onChange={value => setSlogan(value)}
            />
            
            <AtInput
              name='name'
              title='商户名称'
              type='text'
              required
              // placeholder='请填写商户名称'
              value={businessName}
              border={false}
              onChange={value => setBusinessName(value)}
            />
            <AtInput
              name='businessMobile'
              title='手机号码'
              type='phone'
              required
              // placeholder='请填写手机号码'
              value={businessMobile}
              border={false}
              onChange={value => setBusinessMobile(value)}
            />
            <AtInput
              name='businessPassword'
              title='密码'
              type='password'
              required
              // placeholder='请填写密码'
              value={businessPassword}
              border={false}
              onChange={value => setBusinessPassword(value)}
            />
            <AtInput
              name='businessAddress'
              title='商户地址'
              type='text'
              required
              // placeholder='请填写商户地址'
              value={businessAddress}
              border={false}
              onChange={value => setBusinessAddress(value)}
            />
            <AtButton type='primary' circle className='page-login__btn--login'>注册</AtButton>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  )
};

export default observer(Login)

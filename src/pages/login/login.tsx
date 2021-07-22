import './login.scss'

import React, { useEffect, useContext, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import loginStore from '../../store/login'
import { AtTabs, AtTabsPane, AtInput, AtForm, AtButton } from 'taro-ui'


interface Props {}

const Login: React.FC<Props> = (props: Props) => {

  const [current, setCurrent] = useState(0)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
 
  const [id, setId] = useState('')
  const [slogan, setSlogan] = useState('')
  const [shopName, setShopName] = useState('')
  const [shopMobile, setShopMobile] = useState('')
  const [shopPassword, setShopPassword] = useState('')
  const [shopAddress, setShopAddress] = useState('')
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
        <AtTabs current={current} tabList={tabList} onClick={(value) => setCurrent(value)}>
          <AtTabsPane current={current} index={0} >
            <AtForm className='page-login__login-form'>
              <AtInput
                name='mobile'
                title='手机号码'
                type='phone'
                required
                placeholder='请填写手机号码'
                value={mobile}
                onChange={value => setMobile(value)}
              />
              <AtInput
                name='password'
                title='密码'
                type='password'
                required
                placeholder='请填写密码'
                value={password}
                onChange={value => setPassword(value)}
              />
              <AtButton type='primary' circle className='page-login__btn--login' onClick={() => Taro.navigateTo({
        url: '/pages/center/center'
      })}>登陆</AtButton>
            </AtForm>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
           <AtForm className='page-login__login-form'>
             <AtInput
                name='id'
                title='代理ID'
                placeholder='代理ID'
                type='text'
                value={id}
                onChange={value => setId(value)}
              />
              <AtInput
                name='slogan'
                title='宣传语'
                placeholder='宣传语'
                type='text'
                value={slogan}
                onChange={value => setSlogan(value)}
              />
              
              <AtInput
                name='name'
                title='商户名称'
                type='text'
                required
                placeholder='请填写商户名称'
                value={shopName}
                onChange={value => setShopName(value)}
              />
              <AtInput
                name='mobile'
                title='手机号码'
                type='phone'
                required
                placeholder='请填写手机号码'
                value={shopMobile}
                onChange={value => setShopMobile(value)}
              />
              <AtInput
                name='password'
                title='密码'
                type='password'
                required
                placeholder='请填写密码'
                value={shopPassword}
                onChange={value => setShopPassword(value)}
              />
              <AtInput
                name='name'
                title='商户地址'
                type='text'
                required
                placeholder='请填写商户地址'
                value={shopAddress}
                onChange={value => setShopAddress(value)}
              />
              <AtButton type='primary' circle className='page-login__btn--login'>注册</AtButton>
            </AtForm>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  )
};

export default observer(Login)

import './login.scss'

import React, { useEffect, useContext, useState } from 'react'
import { View } from '@tarojs/components'
import {
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
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
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
            <AtForm className='page-login__login-form' onSubmit={() => {}}>
              <AtInput
                name='phone'
                title='手机号码'
                type='phone'
                required
                placeholder='请输入手机号码'
                value={phone}
                onChange={value => setPhone(value)}
              />
              <AtInput
                name='password'
                title='密码'
                type='password'
                required
                placeholder='请输入密码'
                value={password}
                onChange={value => setPassword(value)}
              />
              <AtButton type='primary' circle formType='submit' className='page-login__btn--login'>登陆</AtButton>
            </AtForm>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  )
};

export default observer(Login)

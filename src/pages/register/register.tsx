import './register.scss'

import React, { useEffect, useContext, useState } from 'react'
import Taro, {
  useRouter,
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Picker, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtInput, AtButton } from 'taro-ui'
import commonStore from '../../store/common-store'
import proxyStore from '../../store/proxy-store'


interface Props {}

const Register: React.FC<Props> = (props: Props) => {

  const router = useRouter();
  console.log(router.params.scene, 1);

  const { type, pid = '' } = decodeURIComponent(router.params.scene).split('&').reduce((item, next) => (Object.assign(item, { [next.split('=')[0]]: next.split('=')[1] })), {});

  console.log(type, pid, 1);

  const tabList = Number(type) === 1 ? [{ title: '代理注册' }] : [{ title: '商户注册' }]
  const store =  Number(type) === 1 ? proxyStore : commonStore

  const { register } = useContext(store);

  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [navigationBarHeight, setNavigationBarHeight] = useState(0)

  const [current, setCurrent] = useState(0)

  const [info, setInfo] = useState({
    pid,
    name: '',
    mobile: '',
    password: '',
    slogan: '',
    picker: [],
    address: '',
  });

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
    <View className='page-register'>
      <View style={{paddingTop: `${navigationBarHeight}px`}}>
        <View style={{lineHeight: `${statusBarHeight}px`, textIndent: '20px', fontSize: '16px'}}>注册</View>
      </View>
      <View className='page-login-content'>
        <View className='page-login-wel'>Welcome</View>
        <AtTabs current={current} tabList={tabList} onClick={(value) => setCurrent(value)}>
          {
            Number(type) === 1 && <AtTabsPane current={current} index={0}>
            <AtInput
              name='pid'
              title='代理ID'
              type='text'
              required
              value={info.pid}
              border={false}
              onChange={value => setInfo({ ...info ,pid: value })}
            />
            <AtInput
              name='mobile'
              title='手机号码'
              type='phone'
              required
              value={info.mobile}
              border={false}
              onChange={value => setInfo({ ...info ,mobile: value })}
            />
            <AtInput
              name='password'
              title='密码'
              type='password'
              required
              value={info.password}
              border={false}
              onChange={value => setInfo({ ...info ,password: value })}
            />
            <Picker className='at-input at-input--without-border' mode='region' value={info.picker} onChange={e => {
              console.log(e, 'e');
              setInfo({ ...info ,picker: e.detail.value })
            }}>
                <View className='picker'>
                  省市区: <Text className="address">{info.picker[0]} {info.picker[1]} {info.picker[2]}</Text>
                </View>
            </Picker>
            <AtInput
              name='address'
              title='所在地址'
              type='text'
              required
              value={info.address}
              border={false}
              onChange={value => setInfo({ ...info ,address: value })}
            />
            <AtButton type='primary' circle className='page-login__btn--login' onClick={() => {
              register({
                ...info,
                province: info.picker[0],
                city: info.picker[1],
                area: info.picker[2],
                required: ['pid', 'mobile', 'password', 'province', 'city', 'area', 'address']
              }); 
            }}>注册
            </AtButton>
          </AtTabsPane>
          }
          {
            Number(type) === 2 && <AtTabsPane current={current} index={0}>
            <AtInput
                name='name'
                title='商户名称'
                type='text'
                required
                value={info.name}
                border={false}
                onChange={value => setInfo({ ...info ,name: value })}
              />
              <AtInput
                name='mobile'
                title='手机号码'
                type='phone'
                required
                value={info.mobile}
                border={false}
                onChange={value => setInfo({ ...info ,mobile: value })}
              />
              <AtInput
                name='password'
                title='密码'
                type='password'
                required
                value={info.password}
                border={false}
                onChange={value => setInfo({ ...info ,password: value })}
              />
              <AtInput
                name='slogan'
                title='宣传语'
                type='text'
                required
                value={info.slogan}
                border={false}
                onChange={value => setInfo({ ...info ,slogan: value })}
              />
              <Picker className='at-input at-input--without-border' mode='region' value={info.picker} onChange={e => {
                console.log(e, 'e');
                setInfo({ ...info ,picker: e.detail.value })
              }}>
                  <View className='picker'>
                    省市区: <Text className="address">{info.picker[0]} {info.picker[1]} {info.picker[2]}</Text>
                  </View>
              </Picker>
              <AtInput
                name='address'
                title='商户地址'
                type='text'
                required
                value={info.address}
                border={false}
                onChange={value => setInfo({ ...info ,address: value })}
              />
              <AtButton type='primary' circle className='page-login__btn--login' onClick={() => {
                register({
                  ...info,
                  province: info.picker[0],
                  city: info.picker[1],
                  area: info.picker[2],
                  required: ['name', 'mobile', 'password', 'slogan', 'province', 'city', 'area', 'address']
                })
              }}>注册
              </AtButton>
          </AtTabsPane>
          }
        </AtTabs>
      </View>
    </View>
  )
};

export default observer(Register)

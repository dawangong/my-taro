/*
 * @Author: your name
 * @Date: 2021-07-22 14:42:40
 * @LastEditTime: 2021-07-29 13:42:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/profile/profile.tsx
 */
import './profile.scss'

import React, { useEffect, useContext, useState } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, OpenData } from '@tarojs/components'
import { AtList, AtListItem, AtModal } from 'taro-ui'
import commonStore from '../../store/common-store'


interface Props {}

const Profile: React.FC<Props> = (props: Props) => {

  const [isOpened, setIsOpened] = useState(false);
  const { logout, businessInfo } = useContext(commonStore);

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
      <AtModal
        isOpened={isOpened}
        cancelText='取消'
        confirmText='确认'
        onClose={() => setIsOpened(false)}
        onCancel={() => setIsOpened(false)}
        onConfirm={() => {
          setIsOpened(false);
          logout();
        }}
        content='确认退出当前账号登陆?'
      />
      <AtList>
        <View className='page-profile__line'>
          <View className='page-center__info-avatar'>
            <OpenData className='avatar' type='userAvatarUrl'/>
          </View>
          <AtListItem
            title={businessInfo.name}
            arrow='right'
            extraText='编辑'
            onClick={() => Taro.navigateTo({
              url: '/pages/person-info/person-info'
            })}
          />
        </View>
        <AtListItem
          title='商户信息'
          arrow='right'
          onClick={() => Taro.navigateTo({
            url: '/pages/business-info/business-info'
          })}
        />
        <AtListItem
          title='退出登录'
          extraText='更换账号'
          arrow='right'
          onClick={() => setIsOpened(true)}
        />
      </AtList>
    </View>
  )
};

export default observer(Profile)

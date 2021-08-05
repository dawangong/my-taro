/*
 * @Author: your name
 * @Date: 2021-07-26 17:05:54
 * @LastEditTime: 2021-08-05 14:32:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/split-detail/split-detail.tsx
 */
import './split-detail.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtList, AtListItem } from 'taro-ui'
import splitStore from '../../store/split-store'



interface Props {}

const SplitDetail: React.FC<Props> = (props: Props) => {

  const router = useRouter();
  const { id } = router.params;

  const { mySplit, getSplitDetail } = useContext(splitStore);
  const status = ['未知状态', '通过审核', '未通过审核', '待审核'];

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getSplitDetail({
      id,
    });
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-split-detail'>
      <View className='page-coupon-edit__bg'></View>
      <View className='page-coupon-edit__content'>
        <AtCard
          className='page-coupon-edit__card'
          title='基本信息'
        >
          <AtList hasBorder={false}>
            <AtListItem title='标题' extraText={mySplit.name} />
            <AtListItem title='活动类型' extraText={mySplit.type === 1 ? '活动' : '优惠券'} />
            <AtListItem title='视频url' extraText={mySplit.url} />
            <AtListItem title='视频截图url' extraText={mySplit.pic} />
            <AtListItem title='对象ID' extraText={mySplit.object_id} />
            <AtListItem title='宣传语' extraText={mySplit.slogan} />
            <AtListItem title='视频状态' extraText={status[mySplit.status]} />
          </AtList>
        </AtCard>
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => Taro.navigateTo({
              url: '/pages/split-edit/split-edit'
            })}>编辑</AtButton>
        {/* <AtCard
          className='page-coupon-edit__card'
          title='扫码详情'
        >
          <View className="img">
            <Image
              mode='widthFix'
              src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
            />
          </View>
        </AtCard>
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => {}}>下载二维码</AtButton> */}
      </View>
    </View>
  )
};

export default observer(SplitDetail)

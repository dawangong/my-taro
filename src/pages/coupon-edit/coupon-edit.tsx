import './coupon-edit.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, Label, Picker } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtList, AtListItem } from 'taro-ui'
// import counterStore from '../../store/counter'



interface Props {}

const CouponEdit: React.FC<Props> = (props: Props) => {

  const [coupon, setCoupon] = useState({
    name: '',
    type: 1,
    coupon_min: '',
    coupon_value: '',
    content: '',
    num: '',
    start_time: '2021.06.01',
    end_time: '2021.09.01'
  })

  const [obj, setObj] = useState({
    selector: ['满减券', '礼品劵'],
    selectorChecked: '满减券',
  });

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
    <View className='page-coupon-edit'>
      <View className='page-coupon-edit__bg'></View>
      <View className='page-coupon-edit__content'>
        <AtCard
          className='page-coupon-edit__card'
          title='卡券信息'
          note='注: 优惠券类型点击即可选择'
        >
          <AtInput
            name='name'
            title='优惠券名称'
            type='text'
            required
            placeholder='请填写优惠券名称'
            value={coupon.name}
            border={false}
            onChange={value => setCoupon({ ...coupon ,name: value })}
          />
          <View className='type'>
            <Picker mode='selector' range={obj.selector} onChange={e => setObj({
              selector: ['满减券', '礼品劵'],
              selectorChecked: obj.selector[e.detail.value],
            })}>
                <AtList>
                  <AtListItem
                    title='优惠券类型'
                    extraText={obj.selectorChecked}
                  />
                </AtList>
              </Picker>
          </View>
          {
            obj.selectorChecked === "满减券" && <AtInput
            name='coupon_min'
            title='满额'
            type='number'
            required
            placeholder='请填写满额'
            value={coupon.coupon_min}
            border={false}
            onChange={value => setCoupon({ ...coupon ,coupon_min: value })}
          />
          }
          {
            obj.selectorChecked === "满减券" && <AtInput
            name='coupon_value'
            title='优惠金额'
            type='number'
            required
            placeholder='请填写优惠金额'
            value={coupon.coupon_value}
            border={false}
            onChange={value => setCoupon({ ...coupon ,coupon_value: value })}
          />
          }
          {
            obj.selectorChecked === "礼品劵" && <AtInput
            name='content'
            title='礼券内容'
            type='text'
            required
            placeholder='请填写礼券内容'
            value={coupon.content}
            border={false}
            onChange={value => setCoupon({ ...coupon ,content: value })}
          />
          }
          <AtInput
            name='num'
            title='优惠券数量'
            type='number'
            required
            placeholder='请填写优惠券数量'
            value={coupon.num}
            border={false}
            onChange={value => setCoupon({ ...coupon ,num: value })}
          />
        </AtCard>
        <AtCard
          className='page-coupon-edit__card'
          title='卡券时间'
        >
          <Picker mode='date' onChange={e => setCoupon({ ...coupon ,start_time: e.detail.value })}>
            <AtList>
              <AtListItem title='开始时间' extraText={coupon.start_time} />
            </AtList>
          </Picker>
          <Picker mode='date' onChange={e => setCoupon({ ...coupon ,end_time: e.detail.value })}>
            <AtList>
              <AtListItem title='结束时间' extraText={coupon.end_time} />
            </AtList>
          </Picker>
        </AtCard>
        {/* <AtCard 
          className='page-coupon-edit__card'
          title='其他配置'
          note='注: 优惠券建议开启此选项,开启则只能作为营销活动的奖品'
        >
          这也是内容区 可以随意定义功能
        </AtCard> */}
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => Taro.navigateBack()}>保存</AtButton>
      </View>
    </View>
  )
};

export default observer(CouponEdit)
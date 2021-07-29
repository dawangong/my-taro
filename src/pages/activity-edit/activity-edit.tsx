import './activity-edit.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, Label, Picker, Button } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon } from 'taro-ui'
import ActivityEditStore from '../../store/activity-edit-store'



interface Props {}

const ActivityEdit: React.FC<Props> = (props: Props) => {

  const { prizes, prizeItem, update, clear, finalUpdate, remove } = useContext(ActivityEditStore);

  const [isOpened, setIsOpened] = useState(false);

  const [activity, setActivity] = useState({
    title: '',
    type: 1,
    start_time: '2021.06.01',
    end_time: '2021.09.01',
    prizes: []
  })

  const [obj, setObj] = useState({
    selector: ['大转盘'],
    selectorChecked: '大转盘',
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
    <View className='page-activity-edit'>
      <View className='page-coupon-edit__bg'></View>
      <View className='page-coupon-edit__content'>
        <AtCard
          className='page-coupon-edit__card'
          title='活动信息'
          note='注: 活动类型点击即可选择'
        >
          <AtInput
            name='name'
            title='活动名称'
            type='text'
            required
            placeholder='请填写活动名称'
            value={activity.title}
            border={false}
            onChange={value => setActivity({ ...activity ,title: value })}
          />
          <View className='type'>
            <Picker mode='selector' range={obj.selector} onChange={e => setObj({
              selector: ['大转盘'],
              selectorChecked: obj.selector[e.detail.value],
            })}>
                <AtList>
                  <AtListItem
                    title='活动类型'
                    extraText={obj.selectorChecked}
                  />
                </AtList>
              </Picker>
          </View>
        </AtCard>
        <AtCard
          className='page-coupon-edit__card'
          title='奖品设置'
          extra='添加'
          extraStyle={{ background: '#6190E8', padding: '1px 10px', color: 'white', display: 'inline-block', borderRadius: '2px' }}
          onClick={() => {
            clear();
            setIsOpened(true);
          }}
        >
          <View className='setting-content' onClick={e => e.stopPropagation()}>
            {
              activity.prizes.map((item: any) => <View className="activity-prize">
                {
                  `${item.title}|${item.num}|${item.percentage}%`
                }
                <AtIcon value='subtract-circle' size='20' color='red' onClick={() => remove(item.coupon_id)} ></AtIcon>
              </View>)
            }
          </View>
        </AtCard>
        <AtCard
          className='page-coupon-edit__card'
          title='活动时间'
        >
          <Picker mode='date' onChange={e => setActivity({ ...activity ,start_time: e.detail.value })}>
            <AtList>
              <AtListItem title='开始时间' extraText={activity.start_time} />
            </AtList>
          </Picker>
          <Picker mode='date' onChange={e => setActivity({ ...activity ,end_time: e.detail.value })}>
            <AtList>
              <AtListItem title='结束时间' extraText={activity.end_time} />
            </AtList>
          </Picker>
        </AtCard>
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => Taro.navigateBack()}>保存</AtButton>
      </View>
      <AtModal isOpened={isOpened} 
        onClose={() => setIsOpened(false)} 
      >
        <AtModalHeader>设置奖品</AtModalHeader>
        <AtModalContent>
          {/* <AtInput
            name='title'
            title='名称'
            type='text'
            required
            value={prizeItem.title}
            border={false}
            onChange={() => {}}
          /> */}
          <View className="price-item" onClick={() => Taro.navigateTo({
              url: '/pages/coupon-list-select/coupon-list-select'
            })}>
            <Label>奖品</Label>
            <Text>{prizeItem.title}</Text>
            <AtIcon value='chevron-right' size='30' color='#ccc' ></AtIcon>
          </View>
          <AtInput
            name='num'
            title='数量'
            type='text'
            required
            value={prizeItem.num}
            border={false}
            onChange={value => update({ ...prizeItem ,num: value })}
          />
          <AtInput
            name='percentage'
            title='概率'
            type='text'
            required
            value={prizeItem.percentage}
            border={false}
            onChange={value => update({ ...prizeItem ,percentage: value })}
          >
            %
          </AtInput>
          <View className="tips">
            ＊所填写的奖品概率总和不能超过100，未中奖的概率＝100-所填写的奖品概率的总和
          </View>
        </AtModalContent>
        <AtModalAction> 
          <Button onClick={() => setIsOpened(false)}>取消</Button>
          <Button onClick={() => {
            finalUpdate(prizeItem);
            setActivity({...activity, prizes});
            setIsOpened(false);
            }}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
};

export default observer(ActivityEdit)

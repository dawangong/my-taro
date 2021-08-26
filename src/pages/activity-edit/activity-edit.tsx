import './activity-edit.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text, Label, Picker, Button } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon } from 'taro-ui'
import activityStore from '../../store/activity-store'
import tools from 'highly-tools';


interface Props {}

const ActivityEdit: React.FC<Props> = (props: Props) => {

  const router = useRouter();
  const { id } = router.params;

  const { myActivity, addActivity, getActivity, updateActivity, reset, prizeItem, update, clear, finalUpdate, remove } = useContext(activityStore);

  const [isOpened, setIsOpened] = useState(false);

  const [activity, setActivity] = useState(myActivity)

  const [obj, setObj] = useState({
    selector: ['大转盘'],
    selectorChecked: '大转盘',
  });

  useEffect(() => {
    reset();
    id && getActivity({
      id,
      required: ['id']
    })
  }, [])

  useEffect(() => {
    setActivity({
      ...myActivity,
      start_time: myActivity.start_time ? tools.toDate(myActivity.start_time, 'yyyy-MM-dd').nowTime : myActivity.start_time,
      end_time: myActivity.end_time ? tools.toDate(myActivity.end_time, 'yyyy-MM-dd').nowTime : myActivity.end_time
    });
  }, [myActivity])

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
                <AtIcon value='subtract-circle' size='20' color='red' onClick={() => {
                  remove(item.coupon_id);
                  setActivity({
                    ...myActivity,
                    // prizes,
                    start_time: myActivity.start_time ? tools.toDate(myActivity.start_time, 'yyyy-MM-dd').nowTime : myActivity.start_time,
      end_time: myActivity.end_time ? tools.toDate(myActivity.end_time, 'yyyy-MM-dd').nowTime : myActivity.end_time
                  });
                }} ></AtIcon>
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
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => {
          const params = {
            ...activity,
            id,
            start_time: +new Date(activity.start_time)/1000,
            end_time: +new Date(activity.end_time)/1000,
            required: ['title', 'type', 'start_time', 'end_time', 'prizes']
          }
          id ? updateActivity(params) : addActivity(params)
        }}>保存</AtButton>
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
              url: '/sub-packages/pages/coupon-list-select/coupon-list-select'
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
            if(prizeItem.num === '' || prizeItem.percentage === '') {
              Taro.showToast({
                icon: 'none',
                title: '请填写完整后,再尝试点击确认!',
                duration: 1000
              });
            } else {
              finalUpdate(prizeItem);
              setActivity(activity);
              setIsOpened(false);
            }
            }}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
};

export default observer(ActivityEdit)

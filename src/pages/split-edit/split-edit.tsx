import './split-edit.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Picker, Video, Text } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtList, AtListItem, AtTextarea } from 'taro-ui'
import splitStore from '../../store/split-store'



interface Props {}

const SplitEdit: React.FC<Props> = (props: Props) => {

  const router = useRouter();
  const { id } = router.params;

  const { addSplit, mySplit, updateSplit, clearId } = useContext(splitStore);

  const [info, setInfo] = useState(mySplit);

  const [obj, setObj] = useState({
    selector: ['活动'],
    // selector: ['活动', '优惠券'],
    selectorChecked: '活动',
  });

  useEffect(() => {
    console.log(111, info, mySplit.title);
    setInfo({
      ...info,
      object_id: mySplit.object_id,
      title: mySplit.title,
      url: mySplit.url,
      video_id: mySplit.video_id,
    })
  }, [mySplit])

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-split-edit'>
      <View className='page-coupon-edit__bg'></View>
      <View className='page-coupon-edit__content'>
        <AtCard
          className='page-coupon-edit__card'
          title='裂变信息'
          note='注: 活动类型点击即可选择'
        >
          <AtInput
            name='name'
            title='标题'
            type='text'
            required
            placeholder='请填写标题'
            value={info.name}
            border={false}
            onChange={value => setInfo({ ...info ,name: value })}
          />
          <View className={`type ${obj.selectorChecked === '活动' ? 'activity' : 'coupon'}`}>
            <Picker mode='selector' range={obj.selector} onChange={e => {
              setObj({
                selector: ['活动'],
                // selector: ['活动', '优惠券'],
                selectorChecked: obj.selector[e.detail.value],
              });
              clearId();
            }}>
                <AtList>
                  <AtListItem
                    title='活动类型'
                    extraText={obj.selectorChecked}
                  />
                </AtList>
              </Picker>
          </View>
          
          <View className="at-input at-input--without-border">
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <label className="at-input__title at-input__title--required">视频预览</label>
              <Text className="label-placeholder" onClick={() => {
              Taro.navigateTo({
                url: `/sub-packages/pages/video-list/video-list?back=${true}`,
              });
            }}>请点击此处选择视频</Text>
            </View>
            {
              info.url && <Video
              style={{ marginTop: '20px' }}
              id='video'
              src={info.url}
              controls={true}
              autoplay={false}
              loop={false}
              muted={false}
            />
            }
          </View>
          
          <AtInput
            name='object_id'
            title='对象id'
            type='number'
            required
            placeholder='请点击此处选择对象id'
            value={info.object_id}
            border={false}
            editable={false}
            onClick={() => {
              const url = obj.selectorChecked === '活动' ? '/sub-packages/pages/activity-list-select/activity-list-select' : '/sub-packages/pages/coupon-list-select/coupon-list-select';
              Taro.navigateTo({
                url,
              });
            }}
            onChange={value => setInfo({ ...info ,object_id: value })}
          />
          <AtInput
            name='title'
            title='活动名称'
            type='text'
            required
            placeholder='选择对象id后,自动生成'
            value={info.title}
            border={false}
            editable={false}
            onChange={value => setInfo({ ...info ,title: value })}
          />
          <View className="at-input at-input--without-border">
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <label className="at-input__title at-input__title--required">宣传语</label>
              <Text style={{ fontSize: '16px' }}></Text>
            </View>  
            <AtTextarea
              name='slogan'
              title='宣传语'
              type='text'
              required
              placeholder='请填写宣传语'
              value={info.slogan}
              border={false}
              onChange={value => setInfo({ ...info ,slogan: value })}
            />
          </View>
        </AtCard>
        
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => {
          const content = {
            ...info,
            type: obj.selectorChecked === '活动' ? 1 : 2,
            object_id: Number(info.object_id),
            required: ['name', 'url', 'object_id', 'slogan', 'type', 'video_id'],
          };
          id ? updateSplit(content) : addSplit(content);
        }}>保存</AtButton>
      </View>
    </View>
  )
};

export default observer(SplitEdit)

import './video-edit.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtCard } from 'taro-ui'
// import counterStore from '../../store/counter'



interface Props {}

const VideoEdit: React.FC<Props> = (props: Props) => {

  const [video, setVideo] = useState({
    name: '',
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
    <View className='page-video-edit'>
      <View className='page-coupon-edit__bg'></View>
      <View className='page-coupon-edit__content'>
        <AtCard
          className='page-coupon-edit__card'
          title='视频信息'
        >
          <AtInput
            name='name'
            title='名称'
            type='text'
            required
            placeholder='请填写名称'
            value={video.name}
            border={false}
            onChange={value => setVideo({ ...video ,name: value })}
          />
        </AtCard>
        <AtCard
          className='page-coupon-edit__card'
          title='上传视频'
        >
          <View className="upload" onClick={() => {
            Taro.chooseVideo({
              sourceType: ['album','camera'],
              camera: 'back',
              success: function (res) {
                console.log(res)
                Taro.uploadFile({
                  url: 'http://wap.921juan.cn/app/v1/common/upload/video',
                  filePath: res.tempFilePath,
                  name: 'file',
                  header: {
                    "content-type": "multipart/form-data",
                    'X-Token': '',
                  },
                  success (res){
                    const data = res.data
                    //do something
                  }
                })
              }
            })
          }}>
            <View>点击上传视频</View>
          </View>
        </AtCard>
        
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => Taro.navigateBack()}>保存</AtButton>
      </View>
    </View>
  )
};

export default observer(VideoEdit)

/*
 * @Author: your name
 * @Date: 2021-07-26 17:07:56
 * @LastEditTime: 2021-08-06 15:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/video-edit/video-edit.tsx
 */
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
import { AtInput, AtButton, AtCard, AtProgress, AtList, AtListItem } from 'taro-ui'
import { base } from '../../services/config'
import Uploader from 'miniprogram-file-uploader'
// import counterStore from '../../store/counter'

const MERGE_URL = `${base}/merge`
const VERIFY_URL = `${base}/verify`
const UPLOAD_URL = `${base}/upload`

interface Props {}

const VideoEdit: React.FC<Props> = (props: Props) => {

  let uploader;

  const [video, setVideo] = useState({
    fileName: '',
    progress: 0,
    uploadedSize: 0,
    averageSpeed: 0,
    timeRemaining: Number.POSITIVE_INFINITY,
    testChunks: true,
  });

  const reset = () => {
    setVideo({
      fileName: '',
      progress: 0,
      uploadedSize: 0,
      averageSpeed: 0,
      timeRemaining: Number.POSITIVE_INFINITY,
      testChunks: true,
    })
  }

  const handleUpload = () => {
    uploader && uploader.upload()
  }

  const handlePause = () => {
    uploader && uploader.pause()
  }

  const handleResume = () => {
    uploader && uploader.resume()
  }

  const handleCancel = () => {
    uploader && uploader.cancel()
  }

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
            name='fileName'
            title='名称'
            type='text'
            required
            placeholder='请填写名称'
            value={video.fileName}
            border={false}
            onChange={value => setVideo({ ...video ,fileName: value })}
          />
        </AtCard>
        <AtCard
          className='page-coupon-edit__card'
          title='上传视频'
        >
          <View className="upload" onClick={async () => {
            reset()
            const { tempFilePath, size } = await Taro.chooseVideo({
              sourceType: ['album','camera'],
              camera: 'back',
              compressed: false
            })
        
            if (!Uploader.isSupport()) {
              Taro.showToast({
                title: '分片上传在 2.10.0 版本以上支持',
                icon: 'none',
                duration: 1000
              })
              return
            }
            if (!video.fileName) {
              Taro.showToast({
                title: '请先填写视频名称',
                icon: 'none',
                duration: 1000
              })
              return
            }
            uploader = new Uploader({
              tempFilePath,
              totalSize: size,
              fileName: video.fileName,
              verifyUrl: VERIFY_URL,
              uploadUrl: UPLOAD_URL,
              mergeUrl: MERGE_URL,
              testChunks: video.testChunks,
              verbose: true
            })
            uploader.on('retry', (res) => {
              console.log('retry', res.url)
            })
        
            uploader.on('complete', (res) => {
              console.log('upload complete', res)
            })
        
            uploader.on('success', (res) => {
              console.log('upload success', res)
            })
        
            uploader.on('fail', (res) => {
              console.log('upload fail', res)
            })
        
            uploader.on('progress', (res: any) => {
              setVideo({
                ...video,
                progress: res.progress,
                uploadedSize: parseInt(res.uploadedSize / 1024),
                averageSpeed: parseInt(res.averageSpeed / 1024),
                timeRemaining: res.timeRemaining
              })
            })
        
            uploader.upload()
          }}>
            <View>点击上传视频</View>
          </View>
        </AtCard>

        <AtCard
          className='page-coupon-edit__card'
          title='上传信息'
        >
          <View className='page-coupon-edit__item-title'>
              上传进度：
          </View>
          <AtProgress percent={video.progress} />
          <AtList>
            <AtListItem title='已上传大小：' extraText={`${video.uploadedSize} kb`} />
            <AtListItem title='平均速度：' extraText={`${video.averageSpeed} kb/s`} />
            <AtListItem title='预计剩余时间：' extraText={`${video.timeRemaining} ms`} />
          </AtList>
        </AtCard>
        
        <AtButton type='primary' className='page-coupon-edit__btn' onClick={() => Taro.navigateBack()}>保存</AtButton>
      </View>
    </View>
  )
};

export default observer(VideoEdit)

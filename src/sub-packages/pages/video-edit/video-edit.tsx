/*
 * @Author: your name
 * @Date: 2021-07-26 17:07:56
 * @LastEditTime: 2021-08-06 17:13:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/video-edit/video-edit.tsx
 */
import './video-edit.scss'

import React, { useEffect, useState } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtCard, AtProgress, AtList, AtListItem } from 'taro-ui'
import { base } from '../../../services/config'
import Uploader from 'miniprogram-file-uploader'
import http from '../../../services/index'
import { addVideoApi } from '../../../api/common-api';

const VERIFY_URL = `${base}/common/upload/verify-url`
const MERGE_URL = `${base}/common/upload/merge-url`
const UPLOAD_URL = `${base}/common/upload/upload-file`

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
      fileName: video.fileName,
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
            if (!video.fileName) {
              Taro.showToast({
                title: '请先填写视频名称',
                icon: 'none',
                duration: 1000
              })
              return
            };
            const token = http.check();
            reset();
            const { tempFilePath, size } = await Taro.chooseVideo({
              sourceType: ['album','camera'],
              camera: 'back',
              compressed: false
            });
        
            if (!Uploader.isSupport()) {
              Taro.showToast({
                title: '分片上传在 2.10.0 版本以上支持',
                icon: 'none',
                duration: 1000
              })
              return
            };
            uploader = new Uploader({
              tempFilePath,
              totalSize: size,
              fileName: `${video.fileName}.mp4`,
              verifyUrl: VERIFY_URL,
              uploadUrl: UPLOAD_URL,
              mergeUrl: MERGE_URL,
              testChunks: video.testChunks,
              verbose: true,
              chunkSize: 5 * 1024 * 1024,
              timeout: 30000,
              header: {
                'X-Token': token,
              }
            });
            uploader.on('retry', (res) => {
              console.log('retry', res.url)
            })
        
            uploader.on('complete', (res) => {
              console.log('upload complete', res)
            })
        
            uploader.on('success', (res) => {
              console.log('upload success', res)
              const title = res.needUpload ? '上传成功' : '此视频已上传过'
              Taro.showToast({
                icon: 'success',
                title,
                duration: 1000
              });
              addVideoApi({
                title: video.fileName,
                url: res.url,
                video_id: res.file_id,
              })
              setTimeout(() => {
                Taro.navigateBack();
              }, 1000);
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
            });
        
            uploader.upload();
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

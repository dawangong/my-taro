/*
 * @Author: your name
 * @Date: 2021-07-26 17:07:21
 * @LastEditTime: 2021-08-11 13:28:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/video-list/video-list.tsx
 */
import './video-list.scss'

import React, { useEffect, useState, useContext } from 'react'
import Taro, {
  useReady,
  useRouter,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, ScrollView, Video } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import { getVideoListApi, removeVideoApi } from '../../../api/common-api';
import splitStore from '../../../store/split-store'


interface Props {}

const VideoList: React.FC<Props> = (props: Props) => {
  // 1=通过 2=未通过 3=待审核
  const state = ['未知', '通过', '未通过', '待审核'];
  const [list, setList] = useState([])
  const { updateUrl } = useContext(splitStore);

  const router = useRouter();
  const { back } = router.params;

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(async () => {
    const res = await getVideoListApi({
      page: 1,
      size: 10000,
    });

    if(res && res.data.code === 200) {
      setList(res.data.data.list);
    }
  })

  const removeVideo = async(data) => {
    const res = await removeVideoApi(data);

    if(res && res.data.code === 200) {
      Taro.showToast({
        icon: 'success',
        title: '删除成功',
        duration: 1000
      });
      setTimeout(async () => {
        const res = await getVideoListApi({
          page: 1,
          size: 10000,
        });
    
        if(res && res.data.code === 200) {
          setList(res.data.data.list);
        }
      }, 1000);
    }
  }

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-video-list'>
      <ScrollView
        className='scroll-view'
        scrollY
        scrollWithAnimation
        scrollTop={0}
        style={{ height: "100%" }}
        lowerThreshold={20}
        upperThreshold={20}
        // onScrollToUpper
      >
        {
          list.map((item: any, index) => 
          <View
            className="activity-card"
            onClick={() => {
              if(back) {
                updateUrl(item.url);
                Taro.navigateBack();
              }
            }}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">视频</View>
                <View>{item.title}</View>
                <View className="activity-card-del" onClick={(e: any) => {
                  e.stopPropagation();
                  removeVideo({
                    id: item.id,
                  })
                }}>
                  <AtIcon value='trash' size='22' color="#ccc" ></AtIcon>
                </View>
              </View>
              <View className="activity-card-content">
                <View className="activity-card-field">
                  <View>视频状态:</View>
                  <View>{state[item.status]}</View>
                </View>
                {
                  item.err_msg && <View className="activity-card-field">
                  <View>驳回原因:</View>
                  <View>{item.err_msg}</View>
                </View>
                }
                <View className="activity-card-field">
                  <Video
                    id='video'
                    src={item.url}
                    controls={true}
                    autoplay={false}
                    loop={false}
                    muted={false}
                  />
                </View>
              </View>
            </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => Taro.navigateTo({
            url: '/sub-packages/pages/video-edit/video-edit'
          })}>新增视频</AtButton>
      </View>
    </View>
  )
};

export default observer(VideoList)

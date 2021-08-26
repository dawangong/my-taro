/*
 * @Author: your name
 * @Date: 2021-07-26 17:05:14
 * @LastEditTime: 2021-08-26 16:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/pages/split-list/split-list.tsx
 */
import './split-list.scss'

import React, { useEffect, useContext, useState } from 'react'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, ScrollView, Image } from '@tarojs/components'
import { AtButton, AtIcon, AtModal } from 'taro-ui'
import splitStore from '../../store/split-store'

interface Props {}

const SplitList: React.FC<Props> = (props: Props) => {

  const { list, getSplitList, removeSplit, clear, upSplit } = useContext(splitStore);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedDel, setIsOpenedDel] = useState(false);
  const [fn, setFn] = useState(() => () => {});
  const status = ['未知', '通过审核', '未通过审核', '待审核'];

  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {
    getSplitList({
      page: 1,
      size: 10000
    })
  })

  // 对应 onHide
  useDidHide(() => {})

  // 对应下拉刷新
  usePullDownRefresh(() => {})

  return (
    <View className='page-split-list'>
      <AtModal
        isOpened={isOpened}
        title='提示'
        cancelText='忽略'
        confirmText='添加视频素材'
        onClose={() => {
          setIsOpened(false);
          Taro.navigateTo({
            url: '/pages/split-edit/split-edit'
          });
        }}
        onCancel={() => {
          setIsOpened(false);
          Taro.navigateTo({
            url: '/pages/split-edit/split-edit'
          });
        }}
        onConfirm={() => {
          setIsOpened(false);
          Taro.navigateTo({
            url: '/sub-packages/pages/video-edit/video-edit'
          });
        }}
        content='新增裂变前,请先确认添加过视频素材，审核通过后即可选择使用此视频'
      />

      <AtModal
        isOpened={isOpenedDel}
        title='提示'
        cancelText='取消'
        confirmText='确认'
        onClose={() => {
          setIsOpenedDel(false);
        }}
        onCancel={() => {
          setIsOpenedDel(false);
        }}
        onConfirm={fn}
        content='确认删除?'
      />
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
          list.map((item: any, index: number) => 
          <View
            className="activity-card"
            onClick={() => Taro.navigateTo({
              url: `/pages/split-detail/split-detail?id=${item.id}`
            })}
            >
              <View className="activity-card-header">
                <View className="activity-card-icon">{item.type === 1 ? '活动' : '优惠券'}</View>
                <View className="activity-card-name">{item.name}</View>
                <View className="activity-card-del" onClick={(e: any) => {
                  e.stopPropagation();
                  setFn(() => () => {
                    removeSplit({
                      id: item.id,
                      required: ['id'],
                    });
                    setIsOpenedDel(false);
                  })
                  setIsOpenedDel(true);
                }}>
                  <AtIcon value='trash' size='22' color="#ccc" ></AtIcon>
                </View>
                {
                  item.top != 0 && <View className="activity-card-icon-sp">活动生效中</View>
                }
              </View>
              <View className="activity-card-content">
                <View className="img">
                  <Image
                    mode='widthFix'
                    src={item.qr_code}
                    onClick={e => {
                      e.stopPropagation();
                      Taro.previewImage({
                        current: item.qr_code, // 当前显示图片的http链接
                        urls: [item.qr_code] // 需要预览的图片http链接列表
                      })
                    }}
                  />
                </View>
                <View>
                  <View className="activity-card-field">
                    <View>视频状态:</View>
                    <View>{status[item.status]}</View>
                  </View>
                  {
                    item.err_msg && <View className="activity-card-field">
                    <View>驳回原因:</View>
                    <View>{item.err_msg}</View>
                  </View>
                  }


                  {
                    item.top === 0 && <View className="activity-card-field">
                    <View className="my-button--small" onClick={(e: any) => {
                      e.stopPropagation();
                      upSplit({
                        id: item.id,
                        required: ['id'],
                      });
                    }}>使用此活动</View>  
                  </View>
                  }
                  
                  
                </View>
                
              </View>

            </View>)
        }
      </ScrollView>
      <View className="add-area">
         <AtButton type='primary' className='page-activity-list__btn' onClick={() => {
           clear();
           setIsOpened(true);
         }}>新增裂变</AtButton>
      </View>
    </View>
  )
};

export default observer(SplitList)

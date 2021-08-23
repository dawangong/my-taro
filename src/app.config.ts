/*
 * @Author: your name
 * @Date: 2021-07-21 18:48:23
 * @LastEditTime: 2021-08-23 19:39:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/app.config.ts
 */
// center => login/register
export default {
  pages: [
    'pages/center/center',
    'pages/login/login',
    'pages/register/register',
    'pages/profile/profile',
    'pages/business-info/business-info',
    'pages/person-info/person-info',
    'pages/cancel-coupon/cancel-coupon',
    'pages/cancel-record/cancel-record',
    'pages/coupon-list/coupon-list',
    'pages/coupon-detail/coupon-detail',
    'pages/coupon-edit/coupon-edit',
    'pages/split-list/split-list',
    'pages/split-edit/split-edit',
    'pages/split-detail/split-detail',
    'pages/activity-list/activity-list',
    'pages/activity-edit/activity-edit',
  ],
  subPackages: [
    {
      root: "sub-packages",
      pages: [
        'pages/video-list/video-list',
        'pages/video-edit/video-edit',
        'pages/coupon-list-select/coupon-list-select',
        'pages/activity-list-select/activity-list-select',
        'pages/poster/poster',
        'pages/deposit-guide/deposit-guide',
        'pages/deposit-record/deposit-record',
        'pages/business-code/business-code',
        'pages/proxy-code/proxy-code',
        'pages/money-list/money-list',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    // navigationStyle: "custom"
  }
}

import { Component } from 'react'
import Taro from '@tarojs/taro'

import './app.scss'

class App extends Component {

  onLaunch () {
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

export default App

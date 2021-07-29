import { Component } from 'react'
import http from './services/index';

import './app.scss'

class App extends Component {

  onLaunch () {
    // http.check();
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

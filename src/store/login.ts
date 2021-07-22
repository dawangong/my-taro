import { observable, action } from 'mobx'
import { createContext } from 'react';

class LoginStore {
  // @observable public counter: number = 0;

  // @action.bound
  // increment() {
  //   this.counter++
  // }

  // @action.bound
  // decrement() {
  //   this.counter--
  // }

  // @action.bound
  // incrementAsync() {
  //   setTimeout(() => {
  //     this.counter++
  //   }, 1000)
  // }
}

export default createContext(new LoginStore)
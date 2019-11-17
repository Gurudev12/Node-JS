import React, { Component } from 'react'
import Counter from './counter/counter'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './counter/reducer'
const store = createStore(reducer);

export class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Counter />
        </Provider>
      </div>
    )
  }
};
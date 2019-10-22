import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import ForgotPassword from './components/forgotPassword';
import Registration from './components/registration';


class App extends Component {
  render() {
    return (
      <div>
        {/* <Login /> */}
        <Registration/>
        {/* <ForgotPassword /> */}

      </div>

    )
  }
}

export default App;

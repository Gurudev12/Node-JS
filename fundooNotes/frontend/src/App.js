import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import ForgotPassword from './components/forgotPassword';
import Registration from './components/registration';
import ResetPassword from './components/resetPassword'
import NewRegistration from './components/newRegistration';


class App extends Component {
  render() {
    return (
      <div>
        {/* <Login />/ */}
        <Registration/>
        {/* <ForgotPassword /> */}
        {/* <ResetPassword/> */}
  {/* <NewRegistration/> */}
      </div>

    )
  }
}

export default App;

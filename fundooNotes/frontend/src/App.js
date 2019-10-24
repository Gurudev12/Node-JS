import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Login from './components/login';
import Registration from './components/registration'
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword'
// import NewRegistration from './components/newRegistration';

class App extends Component {
  render() {
    return (
      <div>

        <BrowserRouter>
          <Switch>
            <Route path="/registration" exact component={Registration} ></Route>
            <Route path="/" exact component={Login}></Route>
            <Route path="/forgotPassword" exact component={ForgotPassword}></Route>
            <Route path="/resetPassword" exact component={ResetPassword}></Route>
          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import VerifyRegistration from './components/verifyRegistration'
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import Dashboard from './components/dashboard';
import {Notes} from './components/notes'

// import NewRegistration from './components/newRegistration';

class App extends Component {
  render() {
    return (
      <div>

        <BrowserRouter>
          <Switch>
            <Route path="/registration" exact component={Registration} ></Route>
            <Route path="/verifyRegistration/:token" exact component={VerifyRegistration}></Route>
            <Route path="/" exact component={Login}></Route>
            <Route path="/forgotPassword" exact component={ForgotPassword}></Route>
            <Route path="/resetPassword/:token" exact component={ResetPassword}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/notes"  component={Notes}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

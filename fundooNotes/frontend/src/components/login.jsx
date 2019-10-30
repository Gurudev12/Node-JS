import React, { Component } from 'react';
import '../css/Login.css'
// import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import {loginService} from '../services/userService';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

class Login extends Component {
        constructor(props){
            super(props)
            this.state = {
                'email': '',
                'password': '',
                showPassword: false,
            };
        }
        
    

      //This method which is called to redirect another page that is "login" page
      setRedirectToRegister = () => {
        this.props.history.push('/registration')
      }

      //This method is used to redirect to 'forgetPassword' page
      setRedirectToForgotPassword = () => {
        this.props.history.push('/forgotPassword')
      }

      //After submitting  on "login" button,submitLogin() is called and create object of login creadential
    submitLogin=()=>{
       let loginObject={}
        loginObject.email=this.state.email;
        loginObject.password=this.state.password

        //This will pass the "loginObject" to "loginService"
        loginService(loginObject)
        .then((data)=>{
            console.log("LOGIN RESPONCE",data);
            if (data.status === 200) {
                toaster.notify("Login Successful", {
                    position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                    duration: null // This notification will not automatically close
                })
            }
        })
        .catch((err)=>{
            toaster.notify("Login unsuccessfull", {
                position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                duration: null // This notification will not automatically close
            })
        
        })
    }

    //this is handle for email
    handleChangeEmail =  (event) => {
        console.log("===>email", event.target.value);
        let emailValue=event.target.value
        this.setState({
            email: emailValue,
        });
    };

    // This is handle for password
    handleChangePassword = (event) => {
        console.log("===>pass", event.target.value);
        let passwordValue=event.target.value;
        this.setState({ 
            password: passwordValue });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        return (
            <div >

                <Card style={{
                    marginTop: "11.8%",
                    marginLeft: "20.8%",
                    position: "absolute",
                    width: "58.4%",
                    height: "63.5%",
                    webkitBoxShadow: "1px 3px 1px #9E9E9E",
                    mozBoxShadow: "1px 3px 1px #9E9E9E",
                    boxShadow: "1px 3px 1px #9E9E9E"
                }}>

                    <div className="fundoo">
                        <b>
                            <span>
                                <label className="fStyle">f</label>
                                <label className="uStyle">u</label>
                                <label className="nStyle">n</label>
                                <label className="dStyle">d</label>
                                <label className="oStyle">o</label>
                                <label className="oOstyle">o</label>
                                <label className="nStyle">N</label>
                                <label className="o0Style">o</label>
                                <label className="tStyle">t</label>
                                <label className="eStyle">e</label>
                            </span>
                        </b>
                    </div><br></br>

                    <div className="fundoo"><b>Sign in</b></div><br></br>

                    <div className="fundoo">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            className=""
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            name="email"
                            autoComplete="email"
                            
                            margin="normal"
                            variant="outlined"
                        />
                        <br></br>     
                        </div>
                        <TextField id="outlined-adornment-password" className="password"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password} 
                            onChange={this.handleChangePassword}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword} > {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        />
                     <br></br>   <br></br>  
                    <div className="fundoo">
                        <Button variant="contained" color="primary" className="login" onClick={this.submitLogin}>
                            Login
                    </Button>
                        <Button variant="contained" color="secondary" className="register" onClick={this.setRedirectToRegister} >
                            Register
                    </Button>
                    </div>

                    <br></br><br></br><br></br><br></br>
                    <Link href="#" onClick="" className="forgotPassword"  onClick={this.setRedirectToForgotPassword} >
                        forgot password?
                    </Link>

                </Card>
            </div>
        )
    }
}
export default Login;
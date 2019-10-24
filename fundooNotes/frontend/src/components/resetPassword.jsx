import React, { Component } from 'react';
import '../css/resetPassword.css'
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import {resetPasswordService} from '../services/userService';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'newPassword': '',
            'confirmPassword': '',
            showPassword: false,
            showPasswords: false

        }
    }
    
     //After clicking on "cancel" button it will redirect to login
     setRedirectToLogin= () => {
        this.props.history.push('/')
      }


    submitResetPassword=()=>{
        if(this.state.newPassword=== this.state.confirmPassword){
           let resetPasswordObject={}
           resetPasswordObject.password=this.state.newPassword;

           resetPasswordService(resetPasswordObject)
           .then((data)=>{
            console.log("PROMICE RESPONCE===>",data);
            if (data.status === 200) {
                toaster.notify("Reset Password Successfull", {
                    position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                    duration: null // This notification will not automatically close
                })
            }
           })
           .catch((err)=>{
            toaster.notify("Error While Reset Password", {
                position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                duration: null // This notification will not automatically close
            })
           })
          
        }else{
            console.log("CHECK THAT BOTH PASSWORD ARE SAME");   
        }
    }
    
    //This is handle for new password
    handleChangeNewPassword = (event) => {
        console.log("==>pass", event.target.value);
        let newPasswordValue =event.target.value
            this.setState({ 
                newPassword: newPasswordValue
            });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    //This is handle for confirm password
    handleChanges = (event) => {
        console.log("==>confirm pass", event.target.value);
        let confirmPasswordValue=event.target.value
        this.setState({
             confirmPassword :confirmPasswordValue
             });
    };

    handleClickShowPasswords = () => {
        this.setState(state => ({ showPasswords: !state.showPasswords }));
    };


    render() {
        return (
            <div>
                <Card style={{
                    marginTop: "11.8%",
                    marginLeft: "20.8%",
                    position: "absolute",
                    width: "58.4%",
                    height: "63.5%"
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

                    <div className="resetPassword"><b>Reset Password</b></div><br></br>
                    {/* <label className="password">Enter new Password</label> */}


                    <div className="fundoo">
                        <TextField id="outlined-adornment-password"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChangeNewPassword}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword} > {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        />
                        <br></br><br></br>

                        <TextField id="outlined-adornment-password"
                            variant="outlined"
                            type={this.state.showPasswords ? 'text' : 'password'}
                            label="Confirm password"
                            value={this.state.confirmPassword} 
                            onChange={this.handleChanges}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPasswords} > {this.state.showPasswords ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        />
                    </div>
                    <br></br> <br></br>

                    <div className="fundoo">
                        <Button variant="contained" color="primary" className="" onClick={this.setRedirectToLogin}>
                            Cancel
                    </Button>&nbsp;&nbsp;
                    <Button variant="contained" color="secondary" className="" onClick={this.submitResetPassword}>
                            Reset
                    </Button></div>



                </Card>
            </div>
        )
    }
}
export default ResetPassword;
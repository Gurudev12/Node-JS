import React, { Component } from 'react';
import '../css/forgotPassword.css'
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { forgotPassword } from '../services/userService'
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

class ForgotPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            'email': ''
        }
    
    }
   
    //After clicking on "cancel" button it will redirect to login
    setRedirectToLogin = () => {
        this.props.history.push('/')
    }

    submitForgotPassword = () => {
        let forgotPasswordObject = {}
        forgotPasswordObject.email = this.state.email

        forgotPassword(forgotPasswordObject)
            .then((data) => {
                console.log("PROMISE RESPONCE==>", data);
                if (data.status === 200) {
                    toaster.notify("Check your mail to reset password", {
                        position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                        duration: null // This notification will not automatically close
                    })
                }

            })
            .catch((err) => {
                toaster.notify("Enter valid email id", {
                    position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                    duration: null // This notification will not automatically close
                })
            })
    }

    //this is handle for email
    handleChangeEmail = (event) => {
        console.log("===>email", event.target.value);
        let eventValue = event.target.value
        this.setState({
            email: eventValue,
        });
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

                    <div className="forgetPassword"><b>Forgot Password?</b></div><br></br><br></br><br></br>
                    <label class="label">Enter your valid email to reset password...</label>
                    <br></br>
                    <div className="fundoo">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className=""
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>

                    <div className="fundoo">
                        <Button variant="contained" color="primary" onClick={this.setRedirectToLogin} >
                            Cancel
                    </Button>&nbsp;&nbsp;
                    <Button variant="contained" color="secondary" onClick={this.submitForgotPassword}>
                            Send
                    </Button>
                    </div>

                </Card>
            </div>
        )
    }
}

export default ForgotPassword;
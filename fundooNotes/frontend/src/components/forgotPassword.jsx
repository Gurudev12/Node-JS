import React, { Component } from 'react';
import '../css/forgotPassword.css'
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';



class ForgotPassword extends Component{
    constructor(props){
        super(props)
        this.state={
            'email':''
        }
    }

    render(){
        return(
            <div >

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

                    <div className="forgetPassword"><b>Forgot Password?</b></div><br></br>
                <label class="label">Enter your valid email to reset password...</label><br></br>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        className="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                    />
                    <br />

                    <Button variant="contained" color="primary" className="send">
                        Send
                    </Button>
                    <Button variant="contained" color="secondary" className="cancel">
                       Cancel
                    </Button>

            </Card>
            </div>
        )
    }
}

export default ForgotPassword;
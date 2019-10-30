
import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import { Button } from '@material-ui/core';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import { verifyRegistrationService } from '../services/userService'
class VerifyRegistration extends Component {

    setRedirectToLogin = () => {
        this.props.history.push('/')
    }


    submitRegistrationVerify = () => {

    
        let token = this.props.match.params.token;

        verifyRegistrationService(token)
            .then((data) => {
                console.log("===>DATA ==>", data);
                toaster.notify("Verify email successfull", {
                    position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                    duration: null // This notification will not automatically close
                })

            })
            .catch((err) => {
                console.log("==ERR==>", err);
                toaster.notify("Verify email unsuccessfull", {
                    position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                    duration: null // This notification will not automatically close
                })

            })
    }

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
                    </div>    <br></br><br></br>


                    <div className="fundoo"><b>Click on Verify button for email verification</b></div><br></br>
                    <br></br><br></br>
                    <div className="fundoo">
                        <Button variant="contained" color="primary" className="" onClick={this.setRedirectToLogin}>
                            Cancel
                    </Button>&nbsp;&nbsp;
                    <Button variant="contained" color="secondary" className="" onClick={this.submitRegistrationVerify}>
                            Verify
                    </Button></div>
                </Card>
            </div>
        )
    }
}
export default VerifyRegistration;
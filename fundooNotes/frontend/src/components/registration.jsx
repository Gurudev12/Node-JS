import React, { Component } from 'react';
import '../css/registration.css';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { registrationService } from '../services/userService';

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }



    //This method which is called to redirect another page that is login
    setRedirect = () => {
        this.props.history.push('/')
    }

    //Clicking on register button following method will call and create 'registrationObject'
    submitRegistration = () => {
        if (this.state.password === this.state.confirmPassword) {
            let registrationObject = {}
            registrationObject.firstName = this.state.firstName;
            registrationObject.lastName = this.state.lastName;
            registrationObject.email = this.state.email;
            registrationObject.password = this.state.password;
            registrationObject.confirmPassword = this.state.confirmPassword;

            //Registration object will send it to server
            registrationService(registrationObject)
                .then((data) => {
                    console.log("PROMISE DATA==>", data);
                    if (data.status === 200) {
                        toaster.notify("Successfully register", {
                            position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                            duration: null // This notification will not automatically close
                        })
                    }
                })
                .catch((err) => {
                    toaster.notify("Register unsuccessfull", {
                        position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                        duration: null // This notification will not automatically close
                    })


                })
        }
        else {
            toaster.notify("Password and confirm password are different", {
                position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
                duration: null // This notification will not automatically close
            })

        }
    }
    //This is handler for 'firstName'
    handleChangeFName = (event) => {
        let firstNameValue = event.target.value;
        this.setState({
            firstName: firstNameValue
        });
        console.log("=>state==", this.state);
    };

    //USING PROMISE
    //    async  handleChangeLName(event) {
    //         console.log("===>lname", event.target.value);
    //         let lastName=event.target.value;
    //        await this.setState({
    //             lastName:lastName
    //         });
    //         console.log("=>state==", this.state);

    //     };

    //This is handler for 'lastName'
    handleChangeLName = (event) => {
        console.log("===>lname", event.target.value);
        let lastNameValue = event.target.value;
        this.setState({
            lastName: lastNameValue
        });
        console.log("=>state==", this.state);
    };

    //This is handler for 'email'
    handleChangeEmail = (event) => {
        console.log("===>email", event.target.value);
        let emailValue = event.target.value
        this.setState({
            email: emailValue,
        });
    };

    //This is handler for 'password'
    handleChangePassword = (event) => {
        console.log("===>pass", event.target.value);
        let passwordValue = event.target.value
        this.setState({
            password: passwordValue
        });
    };
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    //This is handler for confirm password
    handleChangeConfirmPassword = event => {
        console.log("===>conpass", event.target.value);
        let confirmPasswordValue = event.target.value
        this.setState({
            confirmPassword: confirmPasswordValue
        });
    };
    handleClickShowPasswords = () => {
        this.setState(state => ({ showPasswords: !state.showPasswords }));
    };

    render() {
        return (
            <div>
                <Card style={{
                    marginTop: "5.8%",
                    marginLeft: "20.8%",
                    position: "absolute",
                    width: "58.4%",
                    height: "80.5%"
                }}>

                    <div className="fundooName">
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
                    </div>
                    <label className="label">Create Your Account</label>
                    <div className="fundoo">
                        <TextField
                            required
                            id="outlined-name"
                            label="First Name"
                            className="fName"
                            name="firstName"
                            // value={this.state.firstName}
                            // onChange={this.handleChangeFName("firstName")}
                            value={this.state.firstName}
                            onChange={this.handleChangeFName}
                            margin="normal"
                            variant="outlined"
                        /><br></br>
                        <TextField
                            required
                            id="outlined-name"
                            label="Last Name"
                            className=""
                            // value={this.state.lastName}
                            // onChange={this.handleChangeLName('lastName')}
                            value={this.state.lastName}
                            // onChange={(event)=>this.handleChangeLName(event)}   //promise
                            onChange={this.handleChangeLName}

                            margin="normal"
                            variant="outlined"
                        />
                    </div>

                    <div className="fundoo">
                        <TextField
                            className="regpassword"
                            id="outlined-email-input"
                            label="Enter Your emailId"
                            // className="email"
                            // value={this.state.email}
                            // onChange={this.handleChangeEmail('email')}
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
                        <TextField id="outlined-adornment-password"
                            className="regpassword"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword} >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        /><br></br><br></br>

                        <TextField id="outlined-adornment-password"
                            variant="outlined"
                            className="regpassword"
                            type={this.state.showPasswords ? 'text' : 'password'}
                            label="Confirm password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChangeConfirmPassword}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPasswords} > {this.state.showPasswords ?
                                            <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        />
                    </div>
                    <br />

                    <div className="fundoo">
                        <Button variant="contained" color="primary" onClick={this.setRedirect} >Cancel
                    </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={this.submitRegistration}>Create Account
                    </Button>
                    </div>

                </Card>
            </div>
        )
    }
}
export default Registration;
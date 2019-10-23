import React, { Component } from 'react';
import '../css/registration.css';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';


class NewRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            field: {}

        };
        console.log("===>StateObject", this.state.field)
    }


    handleChange = (event) => {
        console.log("==>event.value", event.target.value);

        // let field
        let unique = this.state.field
        
        unique[event.target.name] = event.target.value;


        console.log("UNIQUE VALUE===>", unique);

        this.setState({ unique })
    }
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
                            // value={this.state.field.firstName}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />                        
                        <br></br>
                        <TextField
                            required
                            id="outlined-name"
                            label="Last Name"
                            className=""
                            // value={this.state.field.lastName}
                            name='lastName'
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>

                    <div className="fundoo">
                        <TextField
                            required
                            id="outlined-email-input"
                            label="Enter Your emailId"
                            className=""
                            // value={this.state.field.email}
                            name="email"
                            onChange={this.handleChange}
                            type="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="fundoo">
                        <TextField id="outlined-adornment-password"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            // value={this.state.field.password}
                            name="newPassword"
                            onChange={this.handleChange}
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
                            type={this.state.showPasswords ? 'text' : 'password'}
                            label="Confirm password"
                            // value={this.state.field.confirmPassword}
                            name="confirmPassword"
                            onChange={this.handleChange}

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
                        <Button variant="contained" color="primary" >Cancel
                    </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" >Create
                    </Button>
                    </div>

                </Card>
            </div>
        )
    }
}
export default NewRegistration;
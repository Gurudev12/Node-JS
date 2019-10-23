import React, { Component } from 'react';
import '../css/resetPassword.css'
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'newPassword':'',
            'confirmPassword':'',
            showPassword:false,
            showPasswords:false

        }
    }
    //This is handle for new password
     handleChange = prop => event => {
         console.log("==>pass",event.target.value);
         console.log("==>event",event.target);

        this.setState({ [prop]: event.target.value });
      };
    
      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

  //This is handle for confirm password
    handleChanges = prop => event => {
        console.log("==>confirm pass",event.target.value);

        this.setState({ [prop]: event.target.value });
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
                   onChange={this.handleChange('password')} 
                  InputProps={{ endAdornment: ( <InputAdornment position="end">
                       <IconButton aria-label="Toggle password visibility" 
                       onClick={this.handleClickShowPassword} > {this.state.showPassword ? <VisibilityOff /> : <Visibility />} 
                       </IconButton> 
                       </InputAdornment> ), 
                       }} 
                    />
                    <br></br><br></br>

                    <TextField id="outlined-adornment-password"
                        variant="outlined"
                        type={this.state.showPasswords ? 'text' : 'password'}
                        label="Confirm password"
                        value={this.state.confirmPassword} onChange={this.handleChanges('confirmPassword')}
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
                        <Button variant="contained" color="primary" className="">
                        Cancel
                    </Button>&nbsp;&nbsp;
                    <Button variant="contained" color="secondary" className="">
                        Send
                    </Button></div>
                   


                </Card>
            </div>
        )
    }
}
export default ResetPassword;
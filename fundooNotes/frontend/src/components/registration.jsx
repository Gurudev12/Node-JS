import React, { Component } from 'react';
import '../css/registration.css';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password:'',
        };
        console.log("State",this.state);
    }

   
    handleChangeFName = (event) => {
        let firstName = event.target.value;
        this.setState({
            firstName: firstName
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


  handleChangeLName=(event) =>{
    console.log("===>lname", event.target.value);
    let lastName=event.target.value;
   this.setState({
        lastName:lastName
    });
    console.log("=>state==", this.state);

};


    handleChangeEmail = (event) => {
        console.log("===>email", event.target.value);
        let email=event.target.value
        this.setState({
            email: email,
        });
    };






    handleChange = prop => event => {
        console.log("===>pass", event.target.value);
        this.setState({ [prop]: event.target.value });
      };
      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };


    handleChanges = prop => event => {
        console.log("===>cons", event.target.value);

        this.setState({ [prop]: event.target.value });
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
                        required
                        id="outlined-email-input"
                        label="Enter Your emailId"
                        className=""
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
                variant="outlined"
                 type={this.state.showPassword ? 'text' : 'password'}
                  label="Password" 
                  value={this.state.password}
                   onChange={this.handleChange('password')} 
                  InputProps={{ endAdornment: ( <InputAdornment position="end">
                       <IconButton aria-label="Toggle password visibility" 
                       onClick={this.handleClickShowPassword} >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />} 
                       </IconButton> 
                       </InputAdornment> ), 
                       }} 
                    /><br></br><br></br>    
                    
                    <TextField id="outlined-adornment-password"
                        variant="outlined"
                        type={this.state.showPasswords ? 'text' : 'password'}
                        label="Confirm password"
                        value={this.state.confirmPassword} 
                        onChange={this.handleChanges('confirmPassword')}
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
            <br/>

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
export default Registration;
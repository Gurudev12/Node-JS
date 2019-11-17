import React, { Component } from "react";
import '../css/logout.css'
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, MuiThemeProvider, ClickAwayListener } from "@material-ui/core";

import Popper from '@material-ui/core/Popper';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import profile from '../assets/profile.jpeg'
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                width: '23%',
            }
        }
    }
})


export class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openLogout: false,
            anchorEl: null,
            firstName: '',
            lastName: '',
            email: '',

        }
    }

    handleLogoutDialog = (event) => {
        console.log("LOGOUT POPOVER", this.state.openLogout);

        this.setState({
            openLogout: !this.state.openLogout,
            anchorEl: event.currentTarget

        })
    }
    handleCloseLogout = () => {
        this.setState({
            anchorEl: null,
            openLogout: false

        })
    }

    componentDidMount = () => {
        let firstName = localStorage.getItem('firstName');
        let lastName = localStorage.getItem('lastName');
        let email = localStorage.getItem('email');

        this.setState({
            firstName: firstName,
            lastName: lastName,
            email: email
        })
    }

    handleLogout = () => {
        console.log("INSIDE LOGOUT")
        this.props.props.history.push("/")
    }
    render() {

        return (

            <div>
                <MuiThemeProvider theme={theme}>
                    {/* <ClickAwayListener  onClose={this.handleCloseLogout}> */}
                    <div>

                        <IconButton onClick={this.handleLogoutDialog}
                            onClose={this.handleCloseLogout}>
                            <Avatar> <img src="{this.state.profileUrl}" alt="" /> </Avatar>
                        </IconButton>
                    </div>

                    <div>
                        <Popper
                            open={this.state.openLogout}
                            anchorEl={this.state.anchorEl}
                            onClose={this.handleCloseLogout}

                        >
                            <div  style={{textAlign:"center"}}>
                                <IconButton onClick={this.handleLogoutDialog}
                                    onClose={this.handleCloseLogout}>
                                    <Avatar> <img src={profile} alt="" /> </Avatar>
                                </IconButton>
                            </div>

                            <div style={{textAlign:"center"}}>
                                <label>{this.state.firstName + " " + this.state.lastName}</label>
                            </div>

                            <div  style={{textAlign:"center"}}>
                                {this.state.email}
                            </div>


                           <div>
                           <Button   style={{textAlign:"center"}} variant="contained" color="primary" onClick={() => this.handleLogout()}>
                          Logout
                                </Button>
                           </div>
                        </Popper>

                    </div>
                    {/* </ClickAwayListener> */}
                </MuiThemeProvider>

            </div>
        )
    }
}
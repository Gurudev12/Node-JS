import React, { Component } from 'react';
import '../css/dashboard.css'
import logo from '../assets/keep.png'
import listview from '../assets/listview.svg'
import gridview from '../assets/gridview.svg'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import LabelIcon from '@material-ui/icons/Label';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Avatar, Grid } from '@material-ui/core';
import {getNoteService} from '../services/userService'
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: '68px',
                left: '0',
                width: '200px',
            }
        },
        MuiListItemIcon: {
            root: {
                color: "#000000"
            }
        },
        MuiIconButton: {
            root: {
                color: "#000000",
            
            }
        }
    }
        
});
class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            view: true
        };
    }
    

    handleDrawer = () => {
        console.log("Drawer===>", this.state.open);

        this.state.open === false ? this.setState({ open: true }) : this.setState({ open: false })
    }


    handleViewChange = () => {
        console.log(this.state.view);

        this.state.view === true ? this.setState({ view: false }) : this.setState({ view: true })
    }

    archiveClick = () => {
        this.props.history.push('/')
    }

    // This handler for get all notes 
    handleNote=()=>{
        let loginToken=localStorage.getItem('loginToken')
        console.log("GET TOKEN FROM LOCAL STORAGE===>",loginToken);
        let param="isTrash=false&isArchieve=false"
        getNoteService(param,loginToken)
        .then(data=>{
                console.log("NOTE DATA======>",data);
                
        })
        .catch(err=>{
            console.log("NOTE DATA ERROR=========>",err);
            
        })
    }
    //This handler for get all reminder note
    handleReminder=()=>{
        let loginToken=localStorage.getItem('loginToken')
        console.log("GET TOKEN FROM LOCAL STORAGE===>",loginToken);
        let param="reminder=null"
        getNoteService(param,loginToken)
        .then(data=>{
                console.log("REMINDER DATA======>",data);  
        })
        .catch(err=>{
            console.log("REMINDER DATA ERROR=========>",err);
        })
    }
    //This handler for getting all labels
    // handleLabel=()=>{
    //     let loginToken=localStorage.getItem('loginToken')
    //     console.log("GET TOKEN FROM LOCAL STORAGE===>",loginToken);
    //     let param="reminder=null"
    //     getNoteService(param,loginToken)
    //     .then(data=>{
    //             console.log("REMINDE DATA======>",data);  
    //     })
    //     .catch(err=>{
    //         console.log("REMINDER DATA ERROR=========>",err);
    //     })
    // }
 //This handler for get all archieve note
    handleArchieve=()=>{
        let loginToken=localStorage.getItem('loginToken')
        console.log("GET TOKEN FROM LOCAL STORAGE===>",loginToken);
        let param="isArchieve=true"
        getNoteService(param,loginToken)
        .then(data=>{
                console.log("Archieve DATA======>",data);  
        })
        .catch(err=>{
            console.log("Archieve DATA ERROR=========>",err);
        })
    }
//This handler for get all Trash note
    handleTrash=()=>{
        let loginToken=localStorage.getItem('loginToken')
        console.log("GET TOKEN FROM LOCAL STORAGE===>",loginToken);
        let param="isTrash=true"
        getNoteService(param,loginToken)
        .then(data=>{
                console.log("Trash note DATA======>",data);  
        })
        .catch(err=>{
            console.log("Trash note DATA ERROR=========>",err);
        })
    }
    render() {
        return (
            <div>
                {/* AppBar div*/}
                <div className="appBar">
                    <AppBar position="static" color="default" >
                        <Toolbar >

                            {/* div for first menu icon,image*/}
                            <div className="menu">
                                <IconButton color="inherit" aria-label="Open drawer"
                                    onClick={this.handleDrawer}>
                                    {/* onClick={this.handleDrawerOpen} */}
                                    <MenuIcon />
                                </IconButton>

                                <img src={logo} alt="logo" />

                                <Typography variant="h6" color="inherit">
                                    Fundoo Notes
                            </Typography>
                            </div>


                            {/* div for search and refresh */}
                            <div className="search">
                                {/* className="menu" */}
                                <InputBase
                                    startAdornment={(<InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>)}

                                    placeholder="Search"
                                // inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <div className="refresh">
                                {/* refresh button */}
                                <IconButton onClick="">
                                    {<RefreshIcon />}
                                </IconButton>
                            </div>

                            <div className="rightItems" >
                                <MuiThemeProvider theme={theme}>



                                    {/* list view or grid view */}
                                    <IconButton onClick={this.handleViewChange}>
                                        {this.state.view === true ? <img src={listview} alt="" /> : <img src={gridview} alt="" />}
                                    </IconButton>

                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>

                                    <IconButton>
                                        <AppsIcon />
                                    </IconButton>
                                    {/* profile picture */}
                                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  /> */}
                                    
                                    <IconButton>
                                    <Avatar>G</Avatar>
                                    </IconButton>
                                </MuiThemeProvider>
                            </div>

                        </Toolbar>
                    </AppBar>
                </div>

                {/* Drawer div */}
                <div>
                    <MuiThemeProvider theme={theme}>

                        <Drawer
                            className="drawer"
                            variant="persistent"
                            anchor="left"
                            open={this.state.open}
                        >

                            <List style={{ width: "250px" }}>

                                {/* {['Notes', 'Reminders', 'Labels', 'Archive', 'Trash'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon><AddAlertIcon/></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))} */}


                                <ListItem button key="Notes" onClick={this.handleNote}>
                                    <EmojiObjectsIcon /><ListItemText primary="Notes" />
                                </ListItem>

                                <ListItem button key="Reminder" onClick={this.handleReminder}>
                                    <AddAlertIcon /><ListItemText primary="Reminder" />
                                </ListItem>
                                <Divider orientation="" />

                                <ListItem button key="Label" onClick={this.handleLabel}>
                                    <LabelIcon /><ListItemText primary="Label" />
                                </ListItem>
                                <Divider orientation="" />
                                <ListItem button key="Archive" onClick={this.handleArchieve}>
                                    <ArchiveIcon /><ListItemText primary="Archive" />
                                </ListItem>

                                <ListItem button key="Trash" onClick={this.handleTrash}>
                                    <DeleteIcon /><ListItemText primary="Trash" />
                                </ListItem>

                            </List>

                        </Drawer>
                    </MuiThemeProvider>
                </div>
                {/* dynamic content view  */}
                <div>
                   
                </div>
            </div>
        )
    }
}
export default Dashboard;

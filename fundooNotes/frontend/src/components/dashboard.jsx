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
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import {Avatar,Grid} from '@material-ui/core';
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
        }
    }
});
class Dashboard extends Component {
    state = {
        open: false,
        view: true
    };

    handleDrawer = () => {
        console.log("Drawer===>", this.state.open);

        this.state.open === false ? this.setState({ open: true }) : this.setState({ open: false })
    }


    handleViewChange = () => {
        console.log(this.state.view);

        this.state.view === true ? this.setState({ view: false }) : this.setState({ view: true })
    }

    render() {
        return (
            <div>
                {/* AppBar div*/}
                <div>

                    <AppBar position="static" color="default" >
                        <Toolbar >

                            <IconButton color="inherit" aria-label="Open drawer"
                                onClick={this.handleDrawer}>
                                {/* onClick={this.handleDrawerOpen} */}
                                <MenuIcon />
                            </IconButton>

                            <img src={logo} alt="logo" />

                            <Typography variant="h6" color="inherit">
                                Fundoo Notes
                            </Typography>

                            <div className="menu">
                                <InputBase
                                    startAdornment={(<InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>)}

                                    placeholder="Search"
                                // inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>

                            {/* refresh button */}
                            <IconButton onClick="">
                                {<RefreshIcon />}
                            </IconButton>

                            {/* list view or grid view */}
                            <IconButton onClick={this.handleViewChange}>
                                {this.state.view === true ? <img src={listview} alt="" /> : <img src={gridview} alt="" />}
                            </IconButton>

                            {/* profile picture */}
                            <div className="profile">
                                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  /> */}
                                  <Avatar>G</Avatar>
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


                                <ListItem button key="Notes">
                                    <EmojiObjectsIcon /><ListItemText primary="Notes" />
                                </ListItem>


                                <ListItem button key="Reminder">
                                    <AddAlertIcon /><ListItemText primary="Reminder" />
                                </ListItem>

                                <ListItem button key="Label">
                                    <LabelIcon /><ListItemText primary="Label" />
                                </ListItem>

                                <ListItem button key="Archive">
                                    <ArchiveIcon /><ListItemText primary="Archive" />
                                </ListItem>

                                <ListItem button key="Trash">
                                    <DeleteIcon /><ListItemText primary="Trash" />
                                </ListItem>

                            </List>

                        </Drawer>
                    </MuiThemeProvider>
                </div>

            </div>
        )
    }
}
export default Dashboard;

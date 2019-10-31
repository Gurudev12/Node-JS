import React, { Component } from 'react';
import '../css/dashboard.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


class Dashboard extends Component {
    render() {
        return (
            <div>
                {/* for top menu items like search */}
                <div>
                    <Menu>
                        <MenuItem>Menu
                        </MenuItem>
                    </Menu>
                    <AppBar position="static" color="default" >
                        <Toolbar>

                            <div className="menu">
                                <InputBase
                                    startAdornment={(<InputAdornment position="start">
                                       <SearchIcon />
                                    </InputAdornment>)}
                               
                                    placeholder="Search"
                                    // inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )
    }
}
export default Dashboard;

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
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Avatar } from '@material-ui/core';
import DrawerList from './drawer'
import { CreateNote } from './createNote'
import { getAllNote } from '../services/userService'
import { Notes } from './notes'
import toaster from "toasted-notes";
import { Logout } from './logoutcomponent';
import Masonry from 'react-masonry-component';
import { searchNote } from '../services/userService'


const theme = createMuiTheme({
    overrides: {

        'MuiAvatar': {
            'root': {
                // marginLeft: "400%"
            }
        },
        MuiDrawer: {
            paper: {
                top: "66px",
                width: "18%"
            },
            paperAnchorDockedLeft: {
                borderRight: "0px solid",
            }
        },
        'MuiPaper': {
            'elevation4': {
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)'
            }
        },
        MuiInputBase: {
            input: {
                height: "2.1875em",
                width: "500px"
            }
        },
        MuiList: {
            root: {
                textAlign: "center"
            }
        }
    }
});


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            view: true,
            noteData: [],
            labelData: [],
            componentCall: '',
            profileUrl: '',
            searchValue: '',
            noteToggle: false,
        };
    }

    handleDrawer = () => {

        this.state.open === false ? this.setState({ open: true }) : this.setState({ open: false })
    }

    handleViewChange = () => {
        console.log(this.state.view);

        this.state.view === true ? this.setState({ view: false }) : this.setState({ view: true })
    }

    //This handler for all note that may be notes,reminder note,archieve note,trash note.It based on child sent param
    handleGetAllNote = (param) => {
        let loginToken = localStorage.getItem('loginToken')

        console.log("GET ALL NOTE COMPONENT===>", param);


        // "componentCall" here set state because we are passing this state to note component and based on state it will display the different icon coponent
        this.setState({ componentCall: param })

        getAllNote(param, loginToken)
            .then(data => {
                this.setState({ noteData: data.data.data })
            })
            .catch(err => {
                toaster.notify("Something going wrong", {
                    position: "top",
                    autoClose: 8000,
                })
            })
    }

    //For auto refresh after deleting note
    handleNote = () => {
        let loginToken = localStorage.getItem('loginToken')
        let param = "isTrash=false&isArchieve=false"
        getAllNote(param, loginToken)
            .then(data => {
                this.setState({ noteData: data.data.data })
            })
            .catch(err => {
                toaster.notify("Something going wrong", {
                    position: "top",
                    duration: null
                })
            })
    }

    componentWillMount = () => {

        this.setState({ profileUrl: this.props.location.state.profileUrl });

        let loginToken = localStorage.getItem('loginToken')

        let param = "isTrash=false&isArchieve=false"
        getAllNote(param, loginToken)
            .then(data => {
                this.setState({ noteData: data.data.data })
            })

    }

    handleLabelArray = (labelData) => {

        this.setState({ labelData: labelData })
    }

    handleSearchValue = (event) => {
        this.setState({ searchValue: event.target.value })
    }

    //This is handler for search after click on enter.
    handleKeySearch = (event) => {
        console.log("ENTERED KEY EVENT+++++++++", event.key)
        let loginToken = localStorage.getItem('loginToken');

        let paramValue = this.state.searchValue

        if (event.key == "Enter") {
            this.setState({ noteToggle: !this.state.noteToggle })

            searchNote(paramValue, loginToken)
                .then(data => {
                    console.log("SEARCH NOTE  NOTE SUCCESSFULLY", data.data.data);
                    this.setState({ noteData: data.data.data })

                })
                .catch(err => {
                    console.log("ER RRRRRRRRRR SEARCH NOTE  FROM NOTE", err);
                })
        }
    }
//this is handler set note data after clicking on the perticular label.this method is call inside drawer 
    handleLabelNote=(data)=>{
        this.setState({noteData:data})
    }
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <div className="dashboard">
                    {/* AppBar div*/}
                    <div className="appBar">
                        <AppBar position="fixed" color="default" >
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
                                    {/* <div> */}

                                    <InputBase
                                        type="search"
                                        startAdornment={(<InputAdornment position="start">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>)}
                                        onChange={this.handleSearchValue}
                                        onKeyDown={this.handleKeySearch}
                                        placeholder="Search"
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

                                        {/* <IconButton>
                                            <SettingsIcon />
                                        </IconButton> */}

                                        {/* <IconButton>
                                            <AppsIcon />
                                        </IconButton> */}

                                        {/* <IconButton onClick={this.handleLogoutDialog}>
                                            <Avatar> <img src="{this.state.profileUrl}" alt=""/> </Avatar>
                                        </IconButton> */}

                                    
                                        <Logout props={this.props} />
                                    </MuiThemeProvider>
                                </div>

                            </Toolbar>
                        </AppBar>
                    </div>
                    {/* Create note component call */}
                    <div>
                    <CreateNote labelArray={this.state.labelData} getAllNoteProps={this.handleNote} />

                    </div>
                    {/* DrawerList component call */}
                    {/* "labelArray" is called in "DrawerList" component and purpose of these to send label data from "DrawerList" component to "Dashboard" component */}
                    <DrawerList drawerValue={this.state.open} perticularNotesProps={this.handleGetAllNote} labelArray={this.handleLabelArray} handleLabelNote={this.handleLabelNote} />

                    {/* "getAllNoteProps" is like callback function which call in child component after some operation will perform.Means it will give refreshed notes */}
                    {/* "notesValue" it contain all the notes the based on event(means "noteData" may change every time it contain like "reminder" note "trash",archive,etc) */}
                    {/* <div style={{width:"100%"}}> */}
                    <div style={{width:"100%"}}>

                        {
                            this.state.noteToggle === "true" ?
                                <Notes notesValue={this.state.noteData} componentCall={this.state.componentCall} getAllNoteProps={this.handleGetAllNote} labelArray={this.state.labelData}></Notes>
                                :
                                // <div className={this.state.view ? "gridView" : "listView"}>
                                    <Notes  notesValue={this.state.noteData} componentCall={this.state.componentCall} getAllNoteProps={this.handleGetAllNote} labelArray={this.state.labelData} view={this.state.view} ></Notes>
                              

                        }
                        {/* "componentCall" which  icon should display to it */}
                        {/* "notesValue" all note what are get from backend */}

                        {/* <Notes notesValue={this.state.noteData}  componentCall={this.state.componentCall}  getAllNoteProps={this.handleNote} labelArray={this.state.labelData}></Notes> */}

                    </div>

                </div>
            </MuiThemeProvider>

        )
    }
}
export default Dashboard;



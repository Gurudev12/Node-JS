import React, { Component } from 'react';
import {openDrawer } from '../action/action';
import { connect } from 'react-redux';
import '../css/dashboard.css'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import LabelIcon from '@material-ui/icons/Label';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { getAllLabel } from '../services/userService'
import toaster from "toasted-notes";
import { EditLabel } from './editlabel'
import { getAllNoteL } from '../services/userService'

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: '68px',
                left: '0',
                width: '200px'
            }
        },
        MuiListItemIcon: {
            root: {
                color: "#000000"
            }
        },
        MuiIconButton: {
            root: {
                color: "#000000"
            }
        }

    }

});
class DrawerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteData: [],
            labelData: [],
        };
    }



    //This handler for getting all labels
    componentWillMount = () => {
        let loginToken = localStorage.getItem('loginToken')

        getAllLabel(loginToken)
            .then(data => {
                console.log("NEW LABEL DATA============>>>>", data.data.data);

                this.setState({ labelData: data.data.data });
                this.props.labelArray(this.state.labelData)

            })
            .catch(err => {
                toaster.notify("Something goin wrong", {
                    position: "top",
                    autoClose: 8000,


                })
            })

    }

    handleNoteClicked = () => {
        let param = "isTrash=false&isArchieve=false"
        this.props.perticularNotesProps(param)
    }

    handleReminderClicked = () => {
        let param = "reminder=null"
        this.props.perticularNotesProps(param)
    }

    handleArchieveClicked = () => {
        let param = "isArchieve=true&isTrash=false";
        this.props.perticularNotesProps(param)
    }

    handleTrashClicked = () => {
        let param = "isTrash=true"
        this.props.perticularNotesProps(param)
    }

    getLabel = () => {
        let loginToken = localStorage.getItem('loginToken')

        getAllLabel(loginToken)
            .then(data => {
                console.log("NEW LABEL DATA============>>>>", data.data.data);

                this.setState({ labelData: data.data.data });
                this.props.labelArray(this.state.labelData)

            })
            .catch(err => {
                toaster.notify("Something goin wrong", {
                    position: "top",
                    autoClose: 8000,
                })
            })
    }


    handleSameLabelNote=(label)=>{
        console.log("I M INSIDE CLICKED LABEL",label);

    //   this.setState({labelId:label._id})
        let loginToken = localStorage.getItem('loginToken');

        let paramValue =label._id

        
            // this.setState({ noteToggle: !this.state.noteToggle })

            getAllNoteL(paramValue, loginToken)
                .then(data => {
                    console.log("SAME LABEL  NOTE SUCCESSFULLY", data.data.data);
                    // this.setState({ noteData: data.data.data })
                    this.props.handleLabelNote(data.data.data)

                })
                .catch(err => {
                    console.log("ER RRRRRRRRRR SAME LABEL NOTE  FROM NOTE", err);
                })
            }
    

    render() {
        console.log(
            this.props);

        return (
            <div>

                {/* Drawer div */}
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Drawer
                            className="drawer"
                            variant="persistent"
                            anchor="left"
                            //this open value I will get from store
                            open={this.props.open}
                        >

                            <List style={{ width: "250px" }}>

                                <ListItem button key="Notes"
                                    // onClick={this.handleNote}
                                    onClick={this.handleNoteClicked}>
                                    <EmojiObjectsIcon /><ListItemText primary="Notes" />

                                </ListItem>
                                {/* Call Notes component*/}
                                <ListItem button key="Reminder"
                                    // onClick={this.handleReminder}
                                    onClick={this.handleReminderClicked}

                                >
                                    <AddAlertIcon /><ListItemText primary="Reminder" />
                                </ListItem>
                                <Divider orientation="" />
                                {/* 
                                <ListItem button key="Label" >
                                    <LabelIcon /><ListItemText primary="Label" />
                                </ListItem> */}
                                <label>LABEL</label>
                                {this.state.labelData.map((text, index) => (
                                    // <ListItem button key={index} onClick={this.handleGetLabelNote}>
                                    <ListItem button key={index} onClick={()=>this.handleSameLabelNote(text)} >

                                        <ListItemIcon>
                                            <LabelIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={text.labelName} />
                                    </ListItem>
                                ))}
                                <EditLabel labelData={this.state.labelData} getLabel={this.getLabel} />
                                {/* <ListItem button  onClick={this.handleOpenEditLabel}>
                                    <ListItemIcon> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="gb_Rc"><path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg></ListItemIcon>
                                    <ListItemText primary="Edit labels" />
                                </ListItem> */}
                                <Divider />
                                <ListItem button key="Archive"
                                    // onClick={this.handleArchieve}
                                    onClick={this.handleArchieveClicked}
                                >
                                    <ArchiveIcon /><ListItemText primary="Archive" />
                                </ListItem>
                                <ListItem button key="Trash"
                                    //  onClick={this.handleTrash}
                                    onClick={this.handleTrashClicked}
                                >
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
function mapStateToProps(state) {

    return {
        open: state.open
    };
}

const mapDispatchToProps = {
    openDrawer
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerList);

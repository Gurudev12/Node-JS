import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';

import MenuItem from '@material-ui/core/MenuItem';
import { deleteNote } from '../services/userService';
import {addLabel} from '../services/userService'
import toaster from "toasted-notes";
import Checkbox from '@material-ui/core/Checkbox';

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                width: '23%',
            }
        }
    }
})

export class MoreIcon extends Component {
    /****
     * @description
     *      "open" is used for after click on more icon to open popover which contain contain 'delete Label,add Label'
     *       "labelOpen" is used to open popover of all labels
     */
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            open: false,
            labelOpen: false,
            label:{}
        }
    }
  
    handleClick = (event) => {
        console.log("===>", event.currentTarget);

        this.setState({
            anchorEl: event.currentTarget,
            open: !this.state.open
        });
    };

    handleClose = () => {
        console.log("===>", this.state.anchorEl);

        this.setState({
            anchorEl: null,
            open: !this.state.open
        });
    };

    handleDelete = () => {
        // console.log("===>Delete",this.state.anchorEl);
        let loginToken = localStorage.getItem('loginToken');
        console.log("Note Id=->", this.props.deleteNoteId);

        console.log("GET TOKEN FROM LOCAL STORAGE===>", loginToken);
        this.setState({
            anchorEl: null, open: !this.state.open
        });

        let noteObject = {}

        noteObject._id = this.props.deleteNoteId;
        noteObject.isTrash=true;


        deleteNote(noteObject, loginToken)
            .then(data => {
                console.log("deleteNote DATA==>", data);
                this.props.refreshedNotesProps(this.props.componentCall );


            })
            .catch(err => {
                console.log("deleteNote ERROR==>", err);
                toaster.notify("Error while delete note", {
                    position: "top",
                    autoClose: 8000,
                })
            })
    };

    handleAddLabel = (event) => {
        this.setState({
            open: !this.state.open,
            // anchorEl:event.currentTarget,
            labelOpen: !this.state.labelOpen,
        });
    }

    handleLabelClose = () => {
        this.setState({
            labelOpen: !this.state.labelOpen,
        })
    }

    handleAddLabelNote=(label)=>{
        console.log("PERTICULAR NOTE IN LABEL",label._id);
        
        //To close label popover
        this.setState({labelOpen:!this.state.labelOpen})
        let loginToken = localStorage.getItem('loginToken');
        let noteObject = {}
        noteObject._id = this.props.deleteNoteId;
        noteObject.labelId=label._id;
        addLabel(noteObject,loginToken)
        .then(data=>{
            console.log("Add LABEL TO NOTE SUCCESSFULLY",data);
            this.props.refreshedNotesProps(this.props.componentCall);

        })        
        .catch(err=>{
            console.log("ERROR TO Add LABEL TO NOTE SUCCESSFULLY",err);
        })
    }

    render() {
        return (
            
            <div>
                                 <MuiThemeProvider theme={theme}>

                <Tooltip title="more">

                    <IconButton onClick={this.handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>

                {/*  */}
                <Popover
                    id="simple-popper"

                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    style={{ width: '50%',height:'20%' }}
                >
                    <MenuList>
                        <MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
                        <MenuItem onClick={this.handleAddLabel}>Add Label</MenuItem>
                    </MenuList>
                </Popover>

                <Popover

                    open={this.state.labelOpen}
                    // "anchorEl" will check your position from state where you clicked
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleLabelClose}

                    style={{ width: '40%' }}
                >


                    {this.props.labelArray.map((label, index) => (
                        <MenuList>
                            <Checkbox onChange={()=>this.handleAddLabelNote(label)}></Checkbox>
                            <label htmlFor="">{label.labelName}</label>
                        </MenuList>
                    ))}
                </Popover>

                {/*  */}
                </MuiThemeProvider>

            </div>
        )
    }
}

// 

// 

// 

// 

// 

// 

// 
// 

import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { createLabel } from '../services/userService';
import {deleteLabel} from '../services/userService'
const theme = createMuiTheme({
    overrides: {
        'MuiInputBase': {
            'input': {
                padding: "0px 0px 7px"
            },
        },
        'MuiDialog': {
            'paper': {
                width: "300px"
            }
        }
    }
})

export class EditLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelArray: [],
            popStatus: false,
            IconChange: true,
            createItemChange: true,
            labelName: null,
            editSingleStatus: true,
            uniqueLabelName:''
        }
    }
    /********
     *@description: componentWillReceiveProps() will recieve new props
     ********/
    componentWillReceiveProps(newProps) {
        this.setState({ labelArray: newProps.labelData })
    }
    /********
     *@description: handleLablePopover() is to handle popover of the label 
     ********/
    handleLablePopover = () => {
        this.setState({ popStatus: true })
    }
    /********
     *@description: handleLablePopover() is to handle popover of the label 
     ********/
    handleClose = () => {
        this.setState({ popStatus: false })
    }
    /********
    *@description: handleIconChange() is to handle popover of the label 
    ********/
    handleIconChange = (value) => {
        this.setState({ IconChange: value })
    }
    handleCreateChange = () => {
        this.setState({ labelName: null })
        this.setState({ createItemChange: !this.state.createItemChange })
    }
    handleCreateLabel = (event) => {
        this.setState({ labelName: event.target.value })
    }
    handleEditLabel = (value) => {

        console.log("HANDLE EDIT    =========>",value);
        

        this.setState({ editSingleStatus: !this.state.editSingleStatus,
            uniqueLabelName:value})

    }
    createNewLabel = () => {
        let labelObj = {
            labelName: this.state.labelName
        }
        let loginToken = localStorage.getItem('loginToken');

        createLabel(labelObj,loginToken)
        .then((result) => {
            console.log("LABEL RESULT_---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result)
            this.props.getLabel();
        }).catch((err) => {
            console.log("ERRRRRRRRRRRRRRRRR CREATEE LABEL",err)
        })
    }


    handleDeleteLabel=(label)=>{
        console.log("in delete handle",label._id);
        let loginToken = localStorage.getItem('loginToken');
        let labelObj = {
            _id: label._id,
            userId:label.userId
        }
        deleteLabel(labelObj,loginToken)
        .then((result) => {
            console.log(" update LABEL RESULT_---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result)
            this.props.getLabel();
        }).catch((err) => {
            console.log("ERRRRRRRRRRRRRRRRR CREATEE LABEL",err)
        })

        
    }

    handleUpdateLabel=(event)=>{
        console.log("in update handle",event.target.value);

    }


    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <ListItem button onClick={this.handleLablePopover}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg>
                        </ListItemIcon>
                        <ListItemText primary="Edit Labels" />
                    </ListItem>
                    <Dialog
                        open={this.state.popStatus}
                        onClose={this.handleClose}
                    >
                        <List>
                            {this.state.createItemChange ?
                                <ListItem>
                                    <AddIcon onClick={this.handleCreateChange} />
                                    <TextField
                                        disabled
                                        value=''
                                        placeholder="Create new label"
                                        margin="normal"
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                        onClick={this.handleCreateChange}
                                    />
                                </ListItem> :
                                <ListItem>
                                    <CloseIcon onClick={this.handleCreateChange} />
                                    <TextField
                                        // value={this.state.labelName}
                                        placeholder="Create new label"
                                        margin="normal"
                                        type="text"
                                        onChange={this.handleCreateLabel}
                                    />
                                    <CheckIcon onClick={this.createNewLabel} />
                                </ListItem>
                            }
                            {this.state.labelArray.map((text, index) => (
                                <ListItem key={index} >
                                    <ListItemIcon id="show">
                                        <div id="label">
                                            <img ></img>
                                        </div>
                                        <div id="delete">
                                            <DeleteIcon fontSize="small" onClick={()=>this.handleDeleteLabel(text)} />
                                        </div>
                                    </ListItemIcon>
                                    <div>
                                    {this.state.editSingleStatus ?  <div>
                                        <TextField
                                            type="text"
                                            value={text.labelName}
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                            onClick={this.handleEditLabel}
                                            onChange={this.handleUpdateLabel}
                                        />
                                        </div>:<div>
                                        <TextField
                                            type="text"
                                            value={text.labelName}    
                                            onChange={this.handleUpdateLabel}
                                        />
                                        </div>}
                                   
                                       </div>
                                 
                                </ListItem>
                            ))}
                        </List>

                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}
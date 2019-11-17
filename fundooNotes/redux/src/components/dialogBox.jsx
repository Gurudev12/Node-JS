import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import '../App.css';
import '../css/createNote.css'
import TextField from "@material-ui/core/TextField";
import { IconGroups } from '../components/icongroup'
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import { updateNote } from '../services/userService'

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-between",
                marginTop: "15%",
                width: '20%',
                minHeight: "30px",
                margin: '80px auto',
                paddingBottom: '20px',
            }
        },
    }
})


export class DialogBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            noteTitle: '',
            noteDescription: '',
            noteData:'',
            labelArray:''
        }
    }

    componentWillReceiveProps(nextProps) {
        
        console.log("Color of note in dialog bos",nextProps.singleNote.color);
        
        
        this.setState({
            noteTitle: nextProps.singleNote.noteTitle,
            noteDescription: nextProps.singleNote.noteDescription,
            noteData:nextProps.singleNote,
            labelArray:nextProps.singleNote.labelId
        })
    }

    handleDialogBox = () => {
        this.props.dialogBoxClose();
    }
    

    handleChangeNoteTitle = (event) => {
        console.log("===>EDITED NOTE", event.target.value);
        this.setState({ 
            noteTitle: event.target.value });
    };

    handleChangeNoteDescription=(event)=>{
        console.log("====>EDIT DESRIPTION",event.target.value);
        
        this.setState({noteDescription:event.target.value})
    }

    handleUpdateNote=()=>{
        let loginToken = localStorage.getItem('loginToken');
        let noteObject = {}
        noteObject._id=this.state.noteData._id;
        noteObject.noteTitle = this.state.noteTitle;
        noteObject.noteDescription = this.state.noteDescription;

        updateNote(noteObject, loginToken)
        .then(data => {
            console.log("update note data", data.data);

        })
        .catch(err => {
            console.log("update note ERRRR", err);
        })
        this.props.dialogBoxClose();
        this.props.refreshedNotesProps()

    }

    render() {

        return (
            <MuiThemeProvider theme={theme}>

                <div>
                    
                    <Dialog
                        open={this.props.dialogOpen}
                        onClose={this.handleDialogBox}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >

                        <TextField
                            value={this.state.noteTitle}
                            onChange={this.handleChangeNoteTitle}
                            margin='normal'
                            placeholder='Title'
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                        <TextField
                            
                            value={this.state.noteDescription}
                            onChange={this.handleChangeNoteDescription}
                            margin='normal'
                            placeholder='Description'
                            InputProps={{
                                disableUnderline: true
                            }}
                        />

                        <div className="multipleIcons">
                            {/* sending "forNoteId" to IconGroups  as props*/}

                            <IconGroups forNoteId={this.state.noteData._id}  labelArray={this.props.labelArray} />
                            {/* <IconGroups forNoteId={this.state.noteData._id}  labelArray={this.props.labelArray} /> */}
                            
                            {/* After click on "Close" button the API will hit and update that note */}
                            <Button  onClick={this.handleUpdateNote}>Close</Button>
                        </div>
                    </Dialog>
                </div>
            </MuiThemeProvider>

        )
    }

}
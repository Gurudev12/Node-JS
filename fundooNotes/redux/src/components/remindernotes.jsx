import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import '../App.css';
import '../css/createNote.css'
import TextField from "@material-ui/core/TextField";
import { IconGroups } from '../components/icongroup'
import {DialogBox} from './dialogBox';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import {deleteLabelFromNote} from '../services/userService'

export class ReminderNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            uniqueNote:{}
        }
    }


    handleDialog = (note) => {

        console.log("dialog cliked", this.state.open);
        console.log("UNIQUE NOTE VALUE NOTE",this.state.uniqueNote );
        
        this.setState({ open: !this.state.open,
                        uniqueNote:note
                    })
    }


     handleDialogBoxClose=()=>{
        this.setState({open:!this.state.open})
    }
    
    handleDeleteLabel=(noteInfo,labelInfo)=>{
        console.log("Note",noteInfo._id);

        console.log("DELETE LABEL USER WANT to",labelInfo._id);

        let loginToken = localStorage.getItem('loginToken');
        let noteObject = {}
        noteObject._id = noteInfo._id;
        noteObject.labelId=labelInfo._id;
        deleteLabelFromNote(noteObject,loginToken)
        .then(data=>{
            console.log("DELETE LABEL FROM NOTE SUCCESSFULLY");
            this.props.getAllNoteProps();
            
        })
        .catch(err=>{
            console.log("ERRRRRRRRRR DELETE LABEL FROM NOTE ");

        })
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>   

                    {this.props.notesValue.map((note, index) => (

                        //this "backgroundColor" is based on user set color while creating or updating note
                        <Card style={{backgroundColor:note.color}}>

                            <TextField onClick={()=>this.handleDialog(note)}
                                disabled
                                value={note.noteTitle}
                                margin='normal'
                                placeholder='Title'
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                            <TextField onClick={()=>this.handleDialog(note)}
                                disabled
                                value={note.noteDescription}
                                margin='normal'
                                placeholder='Description'
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />

                             {/* This will map the all label of perticular note */}
                             <div>
                            {note.labelId.map((singleLabel,index)=>(
                                 <Chip                                
                                 label={singleLabel.labelName}
                            
                                 onDelete={()=>this.handleDeleteLabel(note,singleLabel)}

                               />
                            ))}
                            </div>

                            <div className="multipleIcons">
                                {/* "labelArray" contain all the labels which is coming from dashboard through props. and send that "labelArray" to "IconGroups" component */}
                                {/* "forNoteId" contain id of specific o */}
                                <IconGroups forNoteId={note._id} refreshedNotesProps={this.props.getAllNoteProps} labelArray={this.props.labelArray}/>

                            </div>
                           
                                
                        </Card>

                    ))}
                    {/* "dialogOpen" will decide open dialog or not*/}
                    {/* "singleNote" will send single note through props */}
                    {/* "dialogBoxClose" is like  callback it call in child component */}
                    {/* "refreshedNotesProps" which contain props of parent component and it will call in child component */}
                    {/* "labelArray" contain all labels of note */}
                            <DialogBox dialogOpen={this.state.open} singleNote={this.state.uniqueNote} dialogBoxClose={this.handleDialogBoxClose}  refreshedNotesProps={this.props.getAllNoteProps} labelArray={this.props.labelArray}/>

                    
                </div>
            </MuiThemeProvider>
        )
    }

}
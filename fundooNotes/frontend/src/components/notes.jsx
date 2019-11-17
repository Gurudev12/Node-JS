import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import '../css/createNote.css'
import TextField from "@material-ui/core/TextField";
import { IconGroups } from '../components/icongroup'
import { DialogBox } from './dialogBox';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import { deleteLabelFromNote } from '../services/userService'
import { Reminder } from './reminder';
import { ColorIcon } from './color';
import { Archieve } from './archieve';
import { MoreIcon } from './more'

import { DeleteForever } from './deleteForever'
import { Restore } from './restore';
import Masonry from 'react-masonry-component';

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                color: "rgba(0, 0, 0, 0.87)",
                width:" 28%",
                height: "54%",
                display:" flex",
                flexWrap: "wrap",
                marginTop: "3%",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                marginRight: "0%",
                flexDirection: "column",
                justifyContent: "space-between",                
            }
            // ,
            // 'root':{
            //     display: "flex",
            //     flexDirection: "row",
            //     flexWrap:'wrap',
            //     justifyContent: "space-between",
            //     marginTop: "3%",
            //     width: '30%',
            //     height:'40%',
            //      marginLeft:'40%',
            //      marginRight:'0%',
            // }
        },
    }
})

export class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            uniqueNote: {},
            list:"80%"
        }
        
    }


    handleDialog = (note) => {

        console.log("dialog cliked", this.state.open);
        console.log("UNIQUE NOTE VALUE NOTE", this.state.uniqueNote);

        this.setState({
            open: !this.state.open,
            uniqueNote: note
        })
    }


    handleDialogBoxClose = () => {
        this.setState({ open: !this.state.open })
    }

    handleDeleteLabel = (noteInfo, labelInfo) => {
        console.log("Note", noteInfo._id);

        console.log("DELETE LABEL USER WANT to", labelInfo._id);

        let loginToken = localStorage.getItem('loginToken');
        let noteObject = {}
        noteObject._id = noteInfo._id;
        noteObject.labelId = labelInfo._id;
        deleteLabelFromNote(noteObject, loginToken)
            .then(data => {
                console.log("DELETE LABEL FROM NOTE SUCCESSFULLY");
                this.props.getAllNoteProps(this.props.componentCall);

            })
            .catch(err => {
                console.log("ERRRRRRRRRR DELETE LABEL FROM NOTE",err);

            })
    }



    render() {

        return (
            <MuiThemeProvider theme={theme}>
                {/* */}
                {/* style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"20%",width:"72%",flexWrap:"wrap"}} */}
                <div  style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"20%",width:"72%",flexWrap:"wrap"}}>
                
                    {this.props.notesValue.map((note, index) => (

                        //this "backgroundColor" is based on user set color while creating or updating note
                        <Card style={{ backgroundColor: note.color,width:this.props.view?"300px":this.state.list }}>

                            <TextField onClick={() => this.handleDialog(note)}
                                disabled
                                value={note.noteTitle}
                                margin='normal'
                                placeholder='Title'
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                            <TextField onClick={() => this.handleDialog(note)}
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
                                 {note.reminder!=="" && <Chip 
                                        label={(note.reminder).substr(3,18)}
                                    />}

                                {note.labelId.map((singleLabel, index) => (
                                    <Chip 
                                        label={singleLabel.labelName}

                                        onDelete={() => this.handleDeleteLabel(note, singleLabel)}

                                    />
                                ))}
                            </div>

                            <div>

                                {this.props.componentCall === "isTrash=true" ?
                                    <div className="trashIcons">
                                        <DeleteForever noteId={note}  componentCall={this.props.componentCall}  getAllNoteProps={this.props.getAllNoteProps}></DeleteForever>
                                        <Restore noteId={note} componentCall={this.props.componentCall}   getAllNoteProps={this.props.getAllNoteProps} />
                                    </div>

                                    :
                                    <div>
                                        <IconGroups  componentCall={this.props.componentCall}   forNoteId={note._id} refreshedNotesProps={this.props.getAllNoteProps} labelArray={this.props.labelArray} />
                                    </div>


                                }

                                {/* "labelArray" contain all the labels which is coming from dashboard through props. and send that "labelArray" to "IconGroups" component */}
                                {/* "forNoteId" contain id of specific o */}

                                {/* <IconGroups forNoteId={note._id} refreshedNotesProps={this.props.getAllNoteProps} labelArray={this.props.labelArray} /> */}

                            </div>


                        </Card>

                    ))}

                    {/* "dialogOpen" will decide open dialog or not*/}
                    {/* "singleNote" will send single note through props */}
                    {/* "dialogBoxClose" is like  callback it call in child component */}
                    {/* "refreshedNotesProps" which contain props of parent component and it will call in child component */}
                    {/* "labelArray" contain all labels of note */}
                    <DialogBox dialogOpen={this.state.open} singleNote={this.state.uniqueNote} dialogBoxClose={this.handleDialogBoxClose} refreshedNotesProps={this.props.getAllNoteProps} labelArray={this.props.labelArray} />

                    {/* </Masonry> */}

                </div>
             </MuiThemeProvider>
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
// 
import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import restore from '../assets/restore.svg';
import { deleteNoteForever } from '../services/userService'
import toaster from "toasted-notes";
import { updateNote } from '../services/userService'


export class Restore extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleRestoreNote = () => {
        console.log("FOEREVERRRR", this.props.noteId);
        let loginToken = localStorage.getItem('loginToken');
        let noteObject = {}
        //props value is sent from parent component
        noteObject._id = this.props.noteId
        noteObject.isTrash=false;

        updateNote(noteObject, loginToken)
            .then(data => {
                console.log("NOTE DELETED FOREVER SUCCESSFUL", data);
                this.props.getAllNoteProps(this.props.componentCall);

            })
            .catch(err => {
                console.log("ERROR");

            })
    }
    render() {
        return (
            <div>
                <Tooltip title="Restore">
                    <IconButton onClick={this.handleRestoreNote}>
                        <img src={restore} alt="" />
                    </IconButton>
                </Tooltip>

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

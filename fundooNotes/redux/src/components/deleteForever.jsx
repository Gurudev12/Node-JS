import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import deleteForever from '../assets/deleteForever.svg';
import {deleteNoteForever} from '../services/userService'
import toaster from "toasted-notes";


export class DeleteForever extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleteForever: false,
        }
    }

    handleDeleteForever=()=>{
        console.log("FOEREVERRRR",this.props.noteId);
        let loginToken = localStorage.getItem('loginToken');
        let noteObject={}
        //props value is sent from parent component
        noteObject._id=this.props.noteId
        deleteNoteForever(noteObject,loginToken)
        .then(data=>{
            console.log("NOTE DELETED FOREVER SUCCESSFUL",data);
            this.props.getAllNoteProps(this.props.componentCall);

        })
        .catch(err=>{
console.log("ERROR");

        })
    }
    render() {
        return (
            <div>
                <Tooltip title="delete forever">
                    <IconButton onClick={this.handleDeleteForever}>
                        <img src={deleteForever} alt="" />
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
// 

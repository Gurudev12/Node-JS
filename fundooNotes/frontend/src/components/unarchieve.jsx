import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import unarchieve from '../assets/unarchieve.svg';
import {updateNote} from '../services/userService'
import toaster from "toasted-notes";


export class Unarchieve extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleUnarchieve=()=>{
        console.log("Archieve button  click", this.state.archieveButton);
      
        let loginToken = localStorage.getItem('loginToken');
        let noteObject={}
        
        noteObject._id=this.props.noteId;
        noteObject.isArchieve=false;

        updateNote(noteObject,loginToken)
        .then(data=>{
            console.log("ArchieveNote DATA==>",data);
            this.props.refreshedNotesProps(this.props.componentCall);
            
        })
        .catch(err=>{
            console.log("Archieve note ERROR==>",err);
            toaster.notify("Error while archieve note", {
                position: "top", 
                autoClose: 8000,
            })
        })
    }

    render() {
        return (
            <div>
                <Tooltip title="Unarchive">
                    <IconButton onClick={this.handleUnarchieve}>
                        <img src={unarchieve} alt="" />
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

import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import archieve from '../assets/archieve.svg';
import {archieveNote} from '../services/userService'
import toaster from "toasted-notes";



export class Archieve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            archieveButton: false,
        }
    }

    handleArchieve = () => {
        console.log("Archieve button  click", this.state.archieveButton);
        this.setState({ archieveButton: !this.state.archieveButton })

        let loginToken = localStorage.getItem('loginToken');
        console.log("Note Id=->",this.props.archieveNoteId);
        let noteObject={}
        
        noteObject._id=this.props.archieveNoteId;
        noteObject.isArchieve=true;

        archieveNote(noteObject,loginToken)
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
                <Tooltip title="archive">
                    <IconButton onClick={this.handleArchieve}>
                        <img src={archieve} alt="" />
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

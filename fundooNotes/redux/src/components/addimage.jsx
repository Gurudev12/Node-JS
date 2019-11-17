import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import addimg from '../assets/addimg.svg';


export class AddImage extends Component {
    constructor(props){
        super(props)
        this.state={
            addImageButton:false,
        }
    }

    handleAddImage=()=>{
        console.log("Add image  click",this.state.addImageButton);
        
        // let reminderValue=this.target.value;
        this.setState({addImageButton:!this.state.addImageButton})
    }

    render() {
        return (
            <div>
                <Tooltip title="add image">
                    <IconButton onClick={this.handleAddImage}>
                        <img src={addimg} alt="" />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
}
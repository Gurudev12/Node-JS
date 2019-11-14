import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import colaborator from '../assets/colaborate.svg';


export class Colaborator extends Component {
    constructor(props){
        super(props)
        this.state={
            colaboratorButton:false
        }
    }

    handleColaborator=()=>{
        console.log("colaborator  click",this.state.colaboratorButton);
        
        // let reminderValue=this.target.value;
        this.setState({colaboratorButton:!this.state.colaboratorButton})
    }

    render() {
        return (
            <div>
                <Tooltip title="colaborator">
                    <IconButton onClick={this.handleColaborator}>
                        <img src={colaborator} alt="" />
                    </IconButton>
                </Tooltip>

            </div>
        )
    }
}
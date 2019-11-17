import React, { Component } from "react";
import '../css/groupicon.css'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import '../App.css';
import { Reminder } from './reminder';
import { ColorIcon } from './color';
import { Archieve } from './archieve';
import { MoreIcon } from './more'
import { DeleteForever } from './deleteForever'
import { Unarchieve } from './unarchieve'


export class IconGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // componentCall: ''
        }
    }

    // componentWillReceiveProps = () => {
    //     console.log("COMPONENT CALL IN SET STATE",this.state.componentCall);

    //     this.setState({ componentCall: this.props.componentCall })

    // }

    render() {
        return (
            <div>
                {this.props.componentCall === "isArchieve=true&isTrash=false" ?
                    <div className="icons">
                        {/* "componentCall" is called passed as props to child component that means after operation on perticular child component(reminder,color,more ,etc) we will get only perticular component like(allnote,reminder,archieve,trash) */}
                        
                        {/* <Reminder/> */}
                        <Reminder noteId={this.props.forNoteId}   componentCall={this.props.componentCall} refreshedNotesProps={this.props.refreshedNotesProps}/>
                        <ColorIcon colorNoteId={this.props.forNoteId} componentCall={this.props.componentCall} refreshedNotesProps={this.props.refreshedNotesProps} />
                        <Unarchieve noteId={this.props.forNoteId} componentCall={this.props.componentCall} refreshedNotesProps={this.props.refreshedNotesProps} />
                        <MoreIcon deleteNoteId={this.props.forNoteId} componentCall={this.props.componentCall} labelArray={this.props.labelArray} refreshedNotesProps={this.props.refreshedNotesProps} />


                    </div>
                    :
                    <div className="icons">
                        {/* <Reminder/> */}
                        <Reminder noteId={this.props.forNoteId} refreshedNotesProps={this.props.refreshedNotesProps}/>
                        <ColorIcon colorNoteId={this.props.forNoteId} componentCall={this.props.componentCall} refreshedNotesProps={this.props.refreshedNotesProps} />
                        <Archieve archieveNoteId={this.props.forNoteId} componentCall={this.props.componentCall} refreshedNotesProps={this.props.refreshedNotesProps} />
                        <MoreIcon deleteNoteId={this.props.forNoteId} componentCall={this.props.componentCall} labelArray={this.props.labelArray} refreshedNotesProps={this.props.refreshedNotesProps} />
                    </div>
                }
            </div>
        )
    }
}

// 

// 

// 

// 

// 

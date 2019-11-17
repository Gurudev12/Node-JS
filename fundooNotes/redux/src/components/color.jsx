import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import color from '../assets/color.svg';
import Popover from '@material-ui/core/Popover';
import { updateNote } from '../services/userService'

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                width: '23%',
            }
        }
    }
})

const colorsPallete = [
    {
        colorName: "White",
        colorCode: "#ffffff"
    },
    {
        colorName: "Red",
        colorCode: "#ea2e2e"
    },
    {
        colorName: "Orange",
        colorCode: "#ffb600"
    },
    {
        colorName: "Yellow",
        colorCode: "#e1e82e"
    },
    {
        colorName: "Green",
        colorCode: "#ccff90"
    },
    {
        colorName: "Teal",
        colorCode: "#a7ffeb"
    },
    {
        colorName: "Blue",
        colorCode: "#281bd6"
    },
    {
        colorName: "Dark blue",
        colorCode: "#aecbfa"
    },
    {
        colorName: "Purple",
        colorCode: "#d7adfb"
    },
    {
        colorName: "Pink",
        colorCode: "#fdcfe8"
    },
    {
        colorName: "Dark Brown",
        colorCode: "#e6c9a7"
    },
    {
        colorName: "Gray",
        colorCode: "#e8eaed"
    }
]


export class ColorIcon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorOpen: false,
            anchorEl: null,

        }
    }

    
    handleColor = (event) => {
        console.log("Color button  click", this.state.colorOpen);
        console.log("Note id in CoLor component", this.props.colorNoteId);

        // let reminderValue=this.target.value;
        this.setState({
            colorOpen: !this.state.colorOpen,

            // "anchorEl" will set the position where you clicked means that x,y co-ordinate of your clicked and set it to state
            anchorEl: event.currentTarget
         })
        
    }

    handleColorClose = () => {
        this.setState({ colorOpen: !this.state.colorOpen })
    }

    //color contain "colorName" and "colorCode"
    handleAddColor = (color) => {
        let loginToken = localStorage.getItem('loginToken');

        let noteObject = {}
        noteObject._id = this.props.colorNoteId;
        noteObject.color = color.colorCode;
        updateNote(noteObject, loginToken)
            .then(data => {

                //After selecting color popover of color should close
                this.setState({colorOpen:!this.state.colorOpen})

                //This props of parent component which will automatically reload updated page without refresh
                this.props.refreshedNotesProps(this.props.componentCall)


            })
            .catch(err => {
                console.log("Error in Adding color ");
            })

    }
    render() {
        return (
            <div>               
                 <MuiThemeProvider theme={theme}>

                <Tooltip title="color">
                    <IconButton onClick={this.handleColor}>
                        <img src={color} alt="" />
                    </IconButton>
                </Tooltip>

                    <Popover

                        open={this.state.colorOpen}
                        // "anchorEl" will check your position from state where you clicked
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleColorClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                    style={{ width: '30%'}}
                    >

                        {colorsPallete.map((color, index) => (
                            <IconButton style={{ backgroundColor: color.colorCode }} onClick={() => this.handleAddColor(color)}></IconButton>
                        ))}

                    </Popover>

                    </MuiThemeProvider>

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







































































































































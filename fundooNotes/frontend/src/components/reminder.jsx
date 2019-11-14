import React, { Component } from "react";
import '../css/createNote.css'
import '../App.css';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import reminder from '../assets/remind.svg';
import toaster from "toasted-notes";
import { updateNote } from '../services/userService'
import watch from '../assets/watch.svg'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '45%',
                // minHeight: "30px",
                // margin: '20px auto',
                // paddingBottom: '20px'
            }
        }
    }
})







export class Reminder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openReminder: false,
            anchorEl: null,
            datePicker: false,
            date:'',
            time:''
        }
    }

    handleReminder = (event) => {
        console.log("Reminder click", this.state.openReminder);

        // let reminderValue=this.target.value;
        this.setState({
            openReminder: !this.state.openReminder,
            anchorEl: event.currentTarget,
        })
    }

    handleReminderClose = () => {
        this.setState({ openReminder: !this.state.openReminder })
    }


    dateHandler = (value) => {
        console.log("TODAY=======>", value);
        this.setState({ openReminder: !this.state.openReminder })

        let loginToken = localStorage.getItem('loginToken');

        let noteObject = {}

        /**@param today current date with current system time */
        var today = new Date();
        let day = today.getDate(); /** day of current date */
        let month = today.getMonth();/** month of current date */
        let year = today.getFullYear();/** year of current date */
        let reminderDate; /** common variable for collecting reminder time */
        if (value === "1") {
            reminderDate = (new Date(year, month, day, 20, 0, 0)).toString();
            console.log("today date", reminderDate);
            noteObject._id = this.props.noteId;
            noteObject.reminder = reminderDate;
        }
        else if (value === "2") {
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            tomorrow.setHours(8);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);
            reminderDate = tomorrow.toString()
            console.log("tomorrow date ", reminderDate);
            noteObject._id = this.props.noteId;
            noteObject.reminder = reminderDate;
        }
        else if (value === "3") {
            var weekdayValue = today.getDay();/** week day value of current [0-sun,1-mon] */
            let date = new Date(today.setDate(today.getDate() + weekdayValue + (weekdayValue === 0 ? -6 : 2)));
            date.setHours(8);
            date.setMinutes(0);
            date.setSeconds(0);
            reminderDate = date.toString();
            console.log("next monday date", reminderDate);
            noteObject._id = this.props.noteId;
            noteObject.reminder = reminderDate;
        }
        //User requested date
         else if (value === "4") {
            this.setState({ datePicker: !this.state.datePicker})
            let date = new Date(this.state.date+" "+this.state.time);
            reminderDate = date.toString();
            console.log("USER SELECTED DATE&&&&&&&&&&&&", reminderDate);
            noteObject._id = this.props.noteId;
            noteObject.reminder = reminderDate;
        }
        updateNote(noteObject, loginToken)
            .then(data => {
                console.log("Reminder  DATA==>", data);
                this.props.refreshedNotesProps(this.props.componentCall);
            })
            .catch(err => {
                console.log("Reminder note ERROR==>", err);
                toaster.notify("Error while archieve note", {
                    position: "top",
                    autoClose: 8000,
                })
            })
    }

    userSelectedDateHandler = () => {
        console.log("UERWWWWWWWWWW DATA==>");

        this.setState({
            openReminder: !this.state.openReminder,
            datePicker: !this.state.datePicker
        })
    }
    //This will close th popover where user add reminder what they want to add.
    userSelectedDateHandlerClose = () => {
        this.setState({ datePicker: !this.state.datePicker})
    }



    // addReminderHandler=()=>{
    //     this.setState({ datePicker: !this.state.datePicker})
    // }

    handleAddDate=(event)=>{
        console.log("DATEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",event.target.value);
        
        this.setState({date:event.target.value})
    }


    handleAddTime=(event)=>{
        console.log("TIMEEEEEEEEEE",event.target.value);

        this.setState({time:event.target.value})
    }
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>

                    <Tooltip title="reminder">
                        <IconButton onClick={this.handleReminder}>
                            <img src={reminder} alt="" />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id="simple-popper"
                        open={this.state.openReminder}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleReminderClose}
                        style={{ width: '50%' }}
                    >
                        <div className="reminderStyle">
                            <MenuList>

                                <MenuItem>
                                    <div className="reminderMenue"
                                        onClick={() => this.dateHandler("1")}>
                                        Later today <span>8.00PM</span>
                                    </div>
                                </MenuItem>

                                <MenuItem>
                                    <div className="reminderMenue"
                                        onClick={() => this.dateHandler("2")}>
                                        Tommorrow <span>8.00AM</span>
                                    </div>
                                </MenuItem>

                                <MenuItem>
                                    <div className="reminderMenue"
                                        onClick={() => this.dateHandler("3")}>

                                        next week <span>Mon,8.00AM</span>
                                    </div>
                                </MenuItem>

                                <MenuItem>
                                    <div onClick={this.userSelectedDateHandler}>
                                        <img src={watch} alt="logo"/>pick date and time
                                    </div>
                                </MenuItem>

                            </MenuList>
                        </div>

                    </Popover>
                    <Popover
                        id="simple-popper"
                        open={this.state.datePicker}
                        anchorEl={this.state.anchorEl}
                        // onClose={this.userSelectedDateHandlerClose}

                        style={{ width: '50%' }}>
                        <div>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                
                                onChange={this.handleAddDate}

                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>

                            <TextField
                                id="time"
                                label="Alarm clock"
                                type="time"
                                onChange={this.handleAddTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </div>
                        <Button variant="contained" color="primary" onClick={()=>this.dateHandler("4")}>
                            Add
                    </Button>
                    </Popover>
                </MuiThemeProvider>

            </div>
        )
    }
}



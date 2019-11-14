
import React, { Component } from "react";
import '../css/createNote.css'
import Card from "@material-ui/core/Card";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import '../App.css';
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import { IconGroups } from '../components/icongroup'
import { createNote } from '../services/userService'

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: '80%',
                minHeight: "30px",
                margin: '80px auto',
                paddingBottom: '20px',
                marginLeft: "500px",
                marginTop: "20%",
            }
        }
    }
})

export class CreateNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            takeNote: false,
            title: null,
            description: null
        }
    }

    handleCreateNote = () => {
        this.state.takeNote === false ? this.setState({ takeNote: true }) : this.setState({ takeNote: false })

        if (this.state.title != null && this.state.description != null) {

            let loginToken = localStorage.getItem('loginToken')
            let noteObject = {}
            noteObject.noteTitle = this.state.title;
            noteObject.noteDescription = this.state.description;

            // After creating note set title and description null
            this.setState({ title: null, description: null })

            createNote(noteObject, loginToken)
                .then(data => {
                    console.log("Created note data", data.data);
                    this.props.getAllNoteProps();

                })
                .catch(err => {
                    console.log("Created note ERRRR", err);
                })
        }

    }

    handletitle = (event) => {
        console.log("Title===>", event.target.value);

        let titleValue = event.target.value
        this.setState({ title: titleValue });
    }

    handleDescription = (event) => {
        console.log("Title===>", event.target.value);
        let descriptionValue = event.target.value
        this.setState({ description: descriptionValue });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>

                {/* main div */}
                <div>
                    {this.state.takeNote === true ?
                        <div>
                            <Card>
                                <Input
                                    placeholder="title"
                                    value={this.state.title}
                                    onChange={this.handletitle}
                                    disableUnderline={true}
                                /><br></br>
                                <TextField
                                    placeholder="description"
                                    value={this.state.description}
                                    onChange={this.handleDescription}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />

                                <div className="multipleIcons">

                                    <IconGroups  labelArray={this.props.labelArray} />
                                    <Button  onClick={this.handleCreateNote} >Close</Button>
                                </div>
                               
                            </Card>
                        </div> :

                        <div>
                            <Card position="fixed" close={this.state.takeNote === false}>
                                <TextField
                                    placeholder="Take note"
                                    onClick={this.handleCreateNote}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Card>
                        </div>

                    }
                </div>
            </MuiThemeProvider>
        )
    }
}
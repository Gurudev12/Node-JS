import React, { Component } from 'react';
import '../css/Login.css';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }

    render() {
        return (
            <div>
                <Card style={{
                    marginTop: "11.8%",
                    marginLeft: "20.8%",
                    position: "absolute",
                    width: "58.4%",
                    height: "63.5%"
                }}>

                    <div className="fundoo">
                        <b>
                            <span>
                                <label className="fStyle">f</label>
                                <label className="uStyle">u</label>
                                <label className="nStyle">n</label>
                                <label className="dStyle">d</label>
                                <label className="oStyle">o</label>
                                <label className="oOstyle">o</label>
                                <label className="nStyle">N</label>
                                <label className="o0Style">o</label>
                                <label className="tStyle">t</label>
                                <label className="eStyle">e</label>
                            </span>
                        </b>
                    </div>

                    <label className="nameLabel">First Name</label>
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        className="nameLabel"
                        margin="normal"
                    />
                </Card>
            </div>
        )
    }
}
export default Registration;
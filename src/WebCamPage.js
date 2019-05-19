import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as faceapi from 'face-api.js';
import './App.css';

class WebCam extends Component {

    constructor(props) {
        super();
    }

    render() {
        let retval;
        if (this.props.visible) {
            retval =
                <div id="WebCamDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                    <div className="TitleHeader">
                        <h1>Attendance.io</h1>
                    </div>
                </div>
        }
        else {
            retval = null;
        }
        return retval;
    }
}


export default WebCam;
import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class ChooseExisting extends Component {

    constructor(props) {
        super();
    }

    toggleCancelExisting = () => {
        this.props.onCancel();
    }

    render() {
        let retval;
        if (this.props.visible) {
            retval =
                <div id="UseExistingDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                    <div className="TitleHeader">
                        <h1>Attendance.io</h1>
                    </div>
                    <div className="ChoosingClassDiv">
                        <h2>Please Choose Your Class</h2>
                    </div>
                    <div className="ChoosingClassTableDiv">
                        <h3>Table Goes Here</h3>
                    </div>
                    <div id="CancelDiv" className="CancelDiv">
                        <button id="CancelButton" type="button" onClick={this.toggleCancelExisting}>Cancel</button>
                    </div>
                </div>
        }
        else {
            retval = null;
        }
        return retval;
    }
}


export default ChooseExisting;
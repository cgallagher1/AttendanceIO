import React, { Component } from 'react';
import './App.css';

class TitleDisplay extends Component {

    constructor(props) {
        super();
    }

    toggleNewClass = () => {
        this.props.onNewClass();
    }

    toggleUseExisting = () => {
        this.props.onUseExistingClass();
    }


    render() {


        let retval =
            <div id="TitleDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                <div className="TitleHeader">
                    <h1>Attendance.io</h1>
                </div>
                <div id="TitleButtons" className="TitleButtons">
                    <button type="button" onClick={this.toggleNewClass}>Create New Class</button>
                    <br></br>
                    <br></br>
                    <button type="button" onClick={this.toggleUseExisting}>Use Existing Class</button>
                </div>
            </div>

        return retval;
    }
}


export default TitleDisplay;
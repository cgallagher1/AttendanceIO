import React, { Component } from 'react';
import './App.css';

class TitleDisplay extends Component {

    constructor(props) {
        super();
    }


    render() {

 
        let retval = 
        <div id="TitleDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
            <h1>Attendance.io</h1>
            <div className="TitleButtons">
            <button type="button">Create New Class</button>
            <br></br>
            <br></br>
            <button type="button">Use Existing Class</button>
            </div>
        </div>

        return retval;
    }
}


export default TitleDisplay;
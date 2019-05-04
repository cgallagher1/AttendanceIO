import React, { Component } from 'react';
import './App.css';

class TitleDisplay extends Component {

    constructor(props) {
        super();
    }


    render() {
        let retval = <div className="TitleDisplayDiv">
            <h1>Attendance.io</h1>
        </div>

        return retval;
    }
}


export default TitleDisplay;
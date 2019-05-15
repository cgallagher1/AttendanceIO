import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class ClassView extends Component {

    constructor(props) {
        super();
    }


    render() {
        let retval;
        if (this.props.visible) {
            retval =
                <div id="ClassViewDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
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


export default ClassView;
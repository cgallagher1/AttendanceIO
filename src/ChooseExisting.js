import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class ChooseExisting extends Component {

    constructor(props) {
        super();
    }

    render() {
        let retval;
        if (this.props.visible) {
            retval =
                <div id="UseExistingDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                  <h1>Hello Existing</h1>
                </div>
        }
        else {
            retval = null;
        }
        return retval;
    }
}


export default ChooseExisting;
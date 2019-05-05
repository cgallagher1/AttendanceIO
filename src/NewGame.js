import React, { Component } from 'react';
import './App.css';

class NewGame extends Component {

    constructor(props) {
        super();
    }


    render() {


        let retval;
        if(this.props.visible)
        {
            retval = <div id="NewGameDisplayDiv" className="NewGameDisplayDiv">
                <h1>Hello</h1>
            </div>
        }
        else {
            retval = null;
        }
        return retval;
    }
}


export default NewGame;
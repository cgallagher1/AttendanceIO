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

    addTable() {
        var ClassesRefObject = firebase.database().ref('Classes/');

        let tableRef = document.getElementById('availableClassTableBody');

        ClassesRefObject.on('child_added', snap => {
            const tr = document.createElement('tr');

            let RemoveCol = document.createElement("td");
            let chooseButton = document.createElement("button");
            chooseButton.type = "button";
            chooseButton.innerHTML = snap.key();
            chooseButton.onclick = function () {
                console.log(chooseButton.innerHTML)
                this.props.setChosenClass(chooseButton.innerHTML);
            }
            RemoveCol.appendChild(chooseButton);

            tr.appendChild(RemoveCol);

            tableRef.appendChild(tr);
        });
    }

    addTable();
    
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
                        <table id="availableClasses" className="availableClasses">
                            <thead>
                                <tr>
                                    <th>Class Name</th>
                                </tr>
                            </thead>
                            <tbody id="availableClassTableBody">

                            </tbody>
                        </table>
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
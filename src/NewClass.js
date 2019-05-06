import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class NewClass extends Component {

    constructor(props) {
        super();

        this.state = {
            classNameSet: false
        };
    }

    onClassNameSubmit = () => {
        this.setState({
            classNameSet: true
        });

        let classNameHtml = document.getElementById("class_name").value;
        firebase.database().ref('Classes/').child(classNameHtml + '/').set({
            className: classNameHtml
        })
    }

    toggleCancelNewClass = () => {
        this.setState({
            classNameSet: false
        });
        this.props.onCancel();
    }

    addStudent = () => {
        let classNameHtml = document.getElementById("class_name").value;
        let StudentIDHtml = document.getElementById("StudentID").value;
        let StudentName = document.getElementById("StudentName").value;
        let StudentPicture = document.getElementById('StudentPicture').files[0];
    }

    render() {


        let retval;
        if (this.props.visible) {
            if (this.state.classNameSet) {
                retval =
                    <div id="NewClassDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                        <div className="TitleHeader">
                            <h1>Attendance.io</h1>
                        </div>
                        <div id="ClassCreationDiv" className="ClassCreationDiv">
                            <h2>Class Information</h2>
                            <label for="className">Class Name:</label>
                            <input type="text" id="class_name" readOnly="readonly"></input>
                            <div className="SubmitNewStudent">
                                <button id="EnterClass" type="button" disabled onClick={this.onClassNameSubmit}>Enter</button>
                            </div>
                            <label for="classRoster">Add New Student:</label>
                            <div id="RoasterCreatorDiv" className="RoasterCreatorDiv">
                                <div id="studentIDDiv" className="studentIDDiv">
                                    <label for="StudentID">Student ID:</label>
                                    <input type="text" id="StudentID"></input>
                                </div>
                                <div id="studentNameDiv" className="studentNameDiv">
                                    <label for="StudentName">Student Name:</label>
                                    <input type="text" id="StudentName"></input>
                                </div>
                                <div id="studentPictureDiv" className="studentPictureDiv">
                                    <label for="StudentPicture">Student Picture:</label>
                                    <input type="file" id="StudentPicture" accept="image/*" />
                                </div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <div className="SubmitNewStudent">
                                    <button id="EnterStudent" type="button">Enter</button>
                                </div>
                                <div className="CurrentClassDiv">
                                    <label>Current Roster:</label>
                                    <table id="CurrentRoster" className="CurrentRoster">
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                                <th>Student Photo</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="SubmitNewStudent">
                                    <button id="SubmitClassButton" type="button">Submit</button>
                                </div>
                            </div>
                            <div id="CancelDiv" className="CancelDiv">
                                <button id="CancelButton" type="button" onClick={this.toggleCancelNewClass}>Cancel</button>
                            </div>
                        </div>
                    </div>
            }
            else {
                retval =
                    <div id="NewClassDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                        <div className="TitleHeader">
                            <h1>Attendance.io</h1>
                        </div>
                        <div id="ClassCreationDiv" className="ClassCreationDiv">
                            <h2>Class Information</h2>
                            <label htmlFor="className">Class Name:</label>
                            <input type="text" id="class_name"></input>
                            <div className="SubmitNewStudent">
                                <button id="EnterClass" type="button" onClick={this.onClassNameSubmit}>Enter</button>
                            </div>
                        </div>
                        <div id="CancelDiv" className="CancelDiv">
                            <button id="CancelButton" type="button" onClick={this.toggleCancelNewClass}>Cancel</button>
                        </div>
                    </div>
            }
        }
        else {
            retval = null;
        }
        return retval;
    }
}


export default NewClass;
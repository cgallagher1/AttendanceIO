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

        let filename = StudentPicture.name;
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('/studentPictures/' + filename).put(StudentPicture);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                firebase.database().ref('Classes/').child(classNameHtml + '/').child('Roster/').child(StudentIDHtml).set({
                    StudentID: StudentIDHtml,
                    StudentName: StudentName,
                    StudentPicture: downloadURL
                })
            });
        });
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
                            <label>Class Name:</label>
                            <input type="text" id="class_name" readOnly="readonly"></input>
                            <div className="SubmitNewStudent">
                                <button id="EnterClass" type="button" disabled onClick={this.onClassNameSubmit}>Enter</button>
                            </div>
                            <label>Add New Student:</label>
                            <div id="RoasterCreatorDiv" className="RoasterCreatorDiv">
                                <div id="studentIDDiv" className="studentIDDiv">
                                    <label for="StudentID">Student ID:</label>
                                    <input type="text" id="StudentID"></input>
                                </div>
                                <div id="studentNameDiv" className="studentNameDiv">
                                    <label>Student Name:</label>
                                    <input type="text" id="StudentName"></input>
                                </div>
                                <div id="studentPictureDiv" className="studentPictureDiv">
                                    <label>Student Picture:</label>
                                    <input type="file" id="StudentPicture" accept="image/*" />
                                </div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <div className="SubmitNewStudent">
                                    <button id="EnterStudent" type="button" onClick={this.addStudent}>Enter</button>
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
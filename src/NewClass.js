import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class NewClass extends Component {

    constructor(props) {
        super();

        this.state = {
            classNameSet: false,
            readyToAdd: false
        };
    }

    onClassNameSubmit = () => {
        this.setState({
            classNameSet: true
        });
    }

    toggleCancelNewClass = () => {
        this.setState({
            classNameSet: false,
            readyToAdd: false
        });
        let classNameHtml = document.getElementById("class_name").value;
        let RosterRefObject = firebase.database().ref('Classes/').child(classNameHtml + '/');
        RosterRefObject.remove();
        this.props.onCancel();
    }

    toggleSubmitNewClass = () => {
        this.setState({
            classNameSet: false,
            readyToAdd: false
        });
        this.props.onCancel();
    }

    addTable() {
        let classNameHtml = document.getElementById("class_name").value;
        var RosterRefObject = firebase.database().ref('Classes/').child(classNameHtml + '/').child('Roster/');

        let tableRef = document.getElementById('tableBody');

        RosterRefObject.on('child_added', snap => {
            const tr = document.createElement('tr');
            tr.id = snap.child("StudentID").val() + "tr";

            let tdID = document.createElement('th');
            tdID.id = snap.child("StudentID").val();
            tdID.innerHTML = snap.child("StudentID").val();

            tr.appendChild(tdID);

            let tdStudentName = document.createElement('td');
            tdStudentName.id = snap.child("StudentName").val();
            tdStudentName.innerHTML = snap.child("StudentName").val();

            tr.appendChild(tdStudentName);

            let RemoveCol = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.innerHTML = "Remove";
            deleteButton.onclick = function () {
                let RosterChild = RosterRefObject.child(snap.child("StudentID").val());
                RosterChild.remove();
            }
            RemoveCol.appendChild(deleteButton);

            tr.appendChild(RemoveCol);

            tableRef.appendChild(tr);

        });

        RosterRefObject.on('child_removed', snap => {
            const removeStudentName = document.getElementById(snap.child("StudentID").val() + "tr");
            removeStudentName.remove();
        });
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
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
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

        if(this.state.readyToAdd === false){
            this.addTable();
            this.setState({
                readyToAdd: true
            });
        }

    
        document.getElementById("StudentID").value = "";
        document.getElementById("StudentName").value = "";
        document.getElementById('StudentPicture').value = "";

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
                                    <label>Student ID:</label>
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
                                <div id="CurrentClassDiv" className="CurrentClassDiv">
                                    <label>Current Roster:</label>
                                    <table id="CurrentRoster" className="CurrentRoster">
                                        <thead>
                                            <tr>
                                                <th className="rowID">Student ID</th>
                                                <th className="rowName">Student Name</th>
                                                <th className="rowRemove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">

                                        </tbody>
                                    </table>
                                </div>
                                <div className="SubmitNewStudent">
                                    <button id="SubmitClassButton" type="button" onClick={this.toggleSubmitNewClass}>Submit</button>
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
                            <button id="CancelButton" type="button" onClick={this.toggleSubmitNewClass}>Cancel</button>
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
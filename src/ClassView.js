import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class ClassView extends Component {

    constructor(props) {
        super();

        this.state = {
            Day: "",
            Month: "",
            Year: ""
        };
    }

    fillTable() {
        let classNameHtml = this.props.chosenClass;
        let DateRefObject = firebase.database().ref('Classes/').child(classNameHtml + '/').child('Date/');

        let tableRef = document.getElementById('tableBody');

        let month = document.getElementById("monthInput").value;
        let dash = "-"
        let day = document.getElementById("dayInput").value;
        let year = document.getElementById("yearInput").value;


        let dateToFind = month.concat(dash, day, dash, year);
        console.log(dateToFind);
        DateRefObject.once('value', function (snapshot) {
            if (!snapshot.hasChild(dateToFind)) {
                console.log("Does not Exists");
                for (let i = tableRef.rows.length - 1; i >= 0; i--) {
                    tableRef.deleteRow(i);
                }
            }
            else {
                let SpecificDatRef = DateRefObject.child(dateToFind + '/');
                let presentCount = 0;
                let absentCount = 0;
                SpecificDatRef.once('value', function (snapshot) {
                    presentCount = snapshot.numChildren();
                });
                let RosterRefObject = firebase.database().ref('Classes/').child(classNameHtml + '/').child('Roster/');
                RosterRefObject.once('value', function (snapshot) {
                    absentCount = snapshot.numChildren() - presentCount;
                });

                if (presentCount > absentCount) {
                    let presentID = [];
                    SpecificDatRef.once('value', function (snapshot) {
                        snapshot.forEach(function (item) {
                            let itemVal = item.val();
                            presentID.push(itemVal);
                        })
                    });
                    let presentStudentNames = new Array();
                    presentID.forEach(function (element) {
                        RosterRefObject.child(element + '/').child("StudentName").once('value', function (snapshot) {
                            presentStudentNames.push(snapshot.val());
                        });
                    })

                    console.log(presentStudentNames);

                    let absentStudentNames = [];
                    RosterRefObject.once("value", function (snapshot) {
                            snapshot.forEach(function (childSnapshot) {
                                let childData = childSnapshot.val();
                                if (!presentStudentNames.includes(childData['StudentName'])) {
                                    absentStudentNames.push(childData['StudentName']);
                                }
                            });
                        });
                    

                }
                else {

                }
            }
        });
    }

    toggleSubmitDate = () => {
        this.setState({
            Day: document.getElementById("dayInput").value,
            Month: document.getElementById("monthInput").value,
            Year: document.getElementById("yearInput").value
        });

        this.fillTable();
    }

    render() {
        let retval;
        if (this.props.visible) {
            retval =
                <div id="ClassViewDisplayDiv" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                    <div className="TitleHeader">
                        <h1>Attendance.io</h1>
                    </div>
                    <div className="overallClassDiv" id="overallClassDiv">
                        <div className="classTitleDiv" id="classTitleDiv">
                            <h1>{this.props.chosenClass}</h1>
                        </div>
                        <div className="dateAttendanceDiv" id="dateAttendanceDiv">
                            <div className="dateInputDiv" id="dateInputDiv">
                                Month: <input type="text" id="monthInput"></input> <br></br>
                                Day: <input type="text" id="dayInput"></input> <br></br>
                                Year: <input type="text" id="yearInput"></input> <br></br>
                                <button type="button" onClick={this.toggleSubmitDate}>Submit</button>
                            </div>
                            <div className="attendanceByDateDiv" id="attendanceByDateDiv">
                                <div className="dateChosenContainer" id="dateChosenContainer">
                                    <h2>{this.state.Month} / {this.state.Day} / {this.state.Year}</h2>
                                </div>
                                <div className="attendanceTableForDays" id="attendanceTableForDays">
                                    <table id="attendanceTable" className="attendanceTable">
                                        <thead>
                                            <tr>
                                                <th>Present</th>
                                                <th>Absent</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
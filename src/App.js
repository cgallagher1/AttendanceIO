import React, { Component } from 'react';
import TitleDisplay from './TitleDisplay';
import NewClass from './NewClass';
import ChooseExisting from './ChooseExisting';
import ClassView from './ClassView';
import WebCam from './WebCamPage';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      speed: 10,
      titleVisible: true,
      newClassVisible: false,
      useExistingVisible: false,
      classVisible: false,
      chosenClass: "none",
      webCamVisible: false,
      roster: []
    };
  }


  componentDidMount() {
    console.log("good");
  }


  setChosenClass = (chosenClass) => {
    this.setState((currentState) => {
      const newState = {
        classVisible: !currentState.classVisible,
        useExistingVisible: !currentState.useExistingVisible,
        chosenClass: chosenClass
      };
      return newState;
    });
  }

  toggleNewClass = () => {
    this.setState((currentState) => {
      const newState = {
        titleVisible: !currentState.titleVisible,
        newClassVisible: !currentState.newClassVisible
      };
      return newState;
    });
  }

  toggleCancelNewClass = () => {
    this.setState((currentState) => {
      const newState = {
        titleVisible: !currentState.titleVisible,
        newClassVisible: !currentState.newClassVisible
      };
      return newState;
    });
  }

  toggleUseExistingClass = () => {
    this.setState((currentState) => {
      const newState = {
        titleVisible: !currentState.titleVisible,
        useExistingVisible: !currentState.useExistingVisible
      };
      return newState;
    });
  }

  toggleCancelUseExistingClass = () => {
    this.setState((currentState) => {
      const newState = {
        titleVisible: !currentState.titleVisible,
        useExistingVisible: !currentState.useExistingVisible
      };
      return newState;
    });
  }

  toggleCancelClassView = () =>{
    this.setState((currentState)=> {
      const newState = {
        classVisible: !currentState.classVisible,
        useExistingVisible: !currentState.useExistingVisible
      };
      return newState;
    });
  }

  toggleWebCamView = () =>{
    this.setState((currentState)=> {
      const newState = {
        classVisible: !currentState.classVisible,
        webCamVisible: !currentState.webCamVisible
      };
      return newState;
    });
  }

  render() {
    return (
      <div className="App">
        <div className="TitleDiv">
          <TitleDisplay onNewClass={this.toggleNewClass} onUseExistingClass={this.toggleUseExistingClass} visible={this.state.titleVisible}></TitleDisplay>
        </div>
        <div className="NewGameDiv">
          <NewClass onCancel={this.toggleCancelNewClass} visible={this.state.newClassVisible}></NewClass>
        </div>
        <div className="UseExistingDiv">
          <ChooseExisting setChosenClass={this.setChosenClass} chosenClass={this.state.chosenClass} onCancel={this.toggleCancelUseExistingClass} visible={this.state.useExistingVisible}></ChooseExisting>
        </div>
        <div className="ClassDiv">
          <ClassView turnOnCam={this.toggleWebCamView} chosenClass={this.state.chosenClass} visible={this.state.classVisible} onCancel={this.toggleCancelClassView}></ClassView>
        </div>
        <div className="WebCamDiv">
          <WebCam onCancel={this.toggleWebCamView} visible={this.state.webCamVisible}></WebCam>
        </div>
      </div>
    );
  }
}

export default App;

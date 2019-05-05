import React, { Component } from 'react';
import * as firebase from 'firebase';
import TitleDisplay from './TitleDisplay';
import NewGame from './NewGame';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      speed: 10,
      titleVisible: true,
      newGameVisible: false
    };
  }


  componentDidMount() {
    const rootRef = firebase.database().ref().child('Schools');
    const speedRef = rootRef.child('Speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    }); 
  }

  toggleNewClass = () => {
    this.setState((currentState) => {
      const newState = {
        titleVisible: !currentState.titleVisible,
        newGameVisible: !currentState.newGameVisible
      };
      return newState;
    });
  }

  render() 
  {
    return (
      <div className="App">
        <div className="TitleDiv">
          <TitleDisplay onNewClass={this.toggleNewClass} visible={this.state.titleVisible}></TitleDisplay>
        </div>
        <div className="NewGameDiv">
          <NewGame visible={this.state.newGameVisible}></NewGame>
        </div>
        <h1>{this.state.speed}</h1>
      </div>
    );
  }
}

export default App;

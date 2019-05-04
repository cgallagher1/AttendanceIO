import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      speed: 10
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

  render() 
  {
    return (
      <div className="App">
        <div className="boxes">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
        <br></br>
        <h1>{this.state.speed}</h1>
      </div>
    );
  }
}

export default App;

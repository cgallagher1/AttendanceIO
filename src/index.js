import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';



var firebaseConfig = {
    apiKey: "AIzaSyCE8BcPrVGC5MlrrNhgFgfDfL5R2qg1Cps",
    authDomain: "attendance-io.firebaseapp.com",
    databaseURL: "https://attendance-io.firebaseio.com",
    projectId: "attendance-io",
    storageBucket: "attendance-io.appspot.com",
    messagingSenderId: "622629013381",
    appId: "1:622629013381:web:ed00e47b3ad1a20c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

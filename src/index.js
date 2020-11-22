import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase/app'; 
import 'firebase/database'; 
import 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAKds3v3_GykqSzDgC6ilYaCKRJcBoP6Ps",
  authDomain: "interview-question-ea2ff.firebaseapp.com",
  databaseURL: "https://interview-question-ea2ff.firebaseio.com",
  projectId: "interview-question-ea2ff",
  storageBucket: "interview-question-ea2ff.appspot.com",
  messagingSenderId: "539269061608",
  appId: "1:539269061608:web:5ce989e33481efcc5ee25d"
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



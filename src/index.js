import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import firebase from 'firebase/app'; 
import 'firebase/database'; 
import 'firebase/auth';



let firebaseConfig = {
  apiKey: "AIzaSyCP1YifmRYAjn1eEO4uo18XdGnEtpzzq6M",
  authDomain: "it-interview-questions-ce3b5.firebaseapp.com",
  databaseURL: "https://it-interview-questions-ce3b5-default-rtdb.firebaseio.com",
  projectId: "it-interview-questions-ce3b5",
  storageBucket: "it-interview-questions-ce3b5.appspot.com",
  messagingSenderId: "309097191903",
  appId: "1:309097191903:web:918213bfb6e181395ecc6a"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


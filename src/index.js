import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import { firebaseInitializeApp } from './functions'

let firebaseConfig = {
  apiKey: "AIzaSyD9Aj6oNjh7w7974eaH44VC9UK0aQyEksI",
  authDomain: "questions-for-interview-8367f.firebaseapp.com",
  databaseURL: "https://questions-for-interview-8367f-default-rtdb.firebaseio.com",
  projectId: "questions-for-interview-8367f",
  storageBucket: "questions-for-interview-8367f.appspot.com",
  messagingSenderId: "828906226144",
  appId: "1:828906226144:web:3d002662a8141f7e766b85"
};
firebaseInitializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


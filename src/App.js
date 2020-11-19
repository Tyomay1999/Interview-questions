import React from 'react';
import Login from './Components/Login/login';
import { BrowserRouter, Route } from "react-router-dom"
import QuestionType from './Components/TypeOfQuestions/questionType';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route path='/' exact component={QuestionType} />
        <Route path="/register" component={Login} />
      </BrowserRouter>
    </>
  );
}

export default App;

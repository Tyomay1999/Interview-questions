import React from 'react';
import Login from './Components/Login/login';
import { BrowserRouter, Route } from "react-router-dom";
import QuestionType from './Components/TypeOfQuestions/questionType';
import Question from './Components/Question/question';
import NotFound from './Components/NotFound/notFound';

const App = () => {
  return (
      <BrowserRouter>
        <Route path="/login"  component={Login} />
        <Route path='/' exact  component={QuestionType} />
        <Route path='/question'   component={Question} />
        <Route path='/xx'   component={NotFound} />
      </BrowserRouter>
  );
}

export default App;

import React from 'react';
import Login from './Components/Login/login';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionType from './Components/TypeOfQuestions/questionType';
import Question from './Components/Question/question';
import NotFound from './Components/NotFound/notFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path='/'  component={QuestionType} />
        <Route path='/question' component={Question} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

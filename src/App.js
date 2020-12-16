import React from 'react';
import Login from './Components/Login/login';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionType from './Components/TypeOfQuestions/questionType';
import Question from './Components/Question/question';
import NotFound from './Components/NotFound/notFound';
import QuestionResult from './Components/QuestionResult/questionResult';
import Admin from './Components/Admin/admin';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path='/questions' component={QuestionType} />
        <Route path='/question' component={Question} />
        <Route path='/Result' component={QuestionResult} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

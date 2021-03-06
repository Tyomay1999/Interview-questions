import React from 'react';
import Login from './Components/Login/login';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionType from './Components/TypeOfQuestions/questionType';
import Question from './Components/Question/question';
import NotFound from './Components/NotFound/notFound';
import QuestionResult from './Components/QuestionResult/questionResult';
import Admin from './Components/Admin/admin';
import PreviousQuestion from './Components/PreviousQuestion/previousQuestion';
import InfoModal from './Components/InfoModal/infoModal';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path='/questions' component={QuestionType} />
        <Route path='/question' component={Question} />
        <Route path='/Result' component={QuestionResult} />
        <Route path='/PreviousQuestion' component={PreviousQuestion} />
        <Route path='/info' component={InfoModal} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import adminModule from './admin.module.css'
import Questions from './Questions/questions';
import Users from './Users/users';
import CreateQuestion from './CreateQuestion/createQuestion'
import CreateUser from './CreateUser/createUser';
import QuestionTimer from './QuestionTimer/questionTimer';
import { logOut } from '../../functions';

const Admin = ({ history }) => {
  const [users, setUsers] = useState(true);
  const [newUsers, setNewUsers] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);
  const [user, setUser] = useState(false);
  const [question, setQuestion] = useState(false);
  const [navBarIsOpen, setNavBarIsOpen] = useState(false);
  const [questionsTimer, setQuestionsTimer] = useState(false);

  return (
    <div className={adminModule.admin}>
      <header>
        <div className={adminModule.logo}>Questions<span>Admin</span></div>
      </header>
      <div className={adminModule.nav_btn} onClick={() => { setNavBarIsOpen(!navBarIsOpen) }}>Menu</div>
      <div className={adminModule.container}>
        <div className={navBarIsOpen ? adminModule.sidebare : adminModule.sidebar}>
          <nav>
            <b>Questions<span>Admin</span></b>
            <ul className={adminModule.ul}>
              <li
                className={users ? adminModule.active : ''}
                onClick={() => {
                  setUsers(true);
                  setNavBarIsOpen(false);
                  setNewUsers(false);
                  setQuestions(false);
                  setNewQuestion(false);
                  setQuestionsTimer(false)
                }}>
                <b>Users</b></li>
              <li
                className={newUsers ? adminModule.active : ''}
                onClick={() => {
                  setNavBarIsOpen(false);
                  setUsers(false);
                  setNewUsers(true);
                  setQuestions(false);
                  setNewQuestion(false);
                  setUser(false);
                  setQuestionsTimer(false)
                }}>
                <b>Edit user</b></li>
              <li
                className={questions ? adminModule.active : ''}
                onClick={() => {
                  setNavBarIsOpen(false);
                  setQuestions(true);
                  setUsers(false);
                  setNewUsers(false);
                  setNewQuestion(false);
                  setQuestionsTimer(false)
                }}>
                <b>Questions</b></li>
              <li
                className={newQuestion ? adminModule.active : ''}
                onClick={() => {
                  setNewQuestion(true);
                  setNavBarIsOpen(false);
                  setUsers(false);
                  setQuestions(false);
                  setNewUsers(false);
                  setQuestion(false);
                  setQuestionsTimer(false)
                }}>
                <b>Add or change a question</b></li>
                <li
                className={questionsTimer ? adminModule.active : ''}
                onClick={() => {
                  setNavBarIsOpen(false);
                  setQuestions(false);
                  setUsers(false);
                  setNewUsers(false);
                  setNewQuestion(false);
                  setQuestionsTimer(true)
                }}>
                <b>Timer control</b></li>
              <li
                onClick={() => {
                  logOut(history)
                }}
              ><b>Log out</b></li>
            </ul>
          </nav>
        </div>

        <div className={adminModule.main_content}>
          {newUsers ?
            <CreateUser
              setNewUsers={setNewUsers}
              users={user}
              setUsers={setUsers}
              setUser={setUser}
            /> : ''}
          {users ? <Users
            setUsers={setUsers}
            setUser={setUser}
            setNewUsers={setNewUsers}
          /> : ''}
          {questions ? <Questions
            setQuestions={setQuestions}
            setNewQuestion={setNewQuestion}
            setQuestion={setQuestion}
          /> : ''}
          {newQuestion ? <CreateQuestion
            setQuestions={setQuestions}
            setNewQuestion={setNewQuestion}
            Question={question}
          /> : ''}
          {questionsTimer ? <QuestionTimer/>: '' }
        </div>
      </div>
    </div>
  )
}

export default Admin;
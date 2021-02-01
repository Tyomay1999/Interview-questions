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
  const [language, setLanguage] = useState(0);


  return (
    <div className={adminModule.admin}>
      <header>
        <div className={adminModule.logo}>
        {language === 0 ? "Administration" : language === 1 ? "Администрация" : "Ադմինիստրացիա"}
        </div>
      </header>
      <div className={adminModule.nav_btn} onClick={() => { setNavBarIsOpen(!navBarIsOpen) }}>
      {language === 0 ? "Menu" : language === 1 ? "Меню" : "Ընտրացանկ"}
      </div>
      <div className={adminModule.container}>
        <div className={navBarIsOpen ? adminModule.sidebare : adminModule.sidebar}>
          <nav>
            <b>
              {language === 0 ? "Administration" : language === 1 ? "Администрация" : "Ադմինիստրացիա"}
            </b>
            <ul className={adminModule.ul}>
              <li
                onClick={() => {
                  setLanguage((language === 2) ? 0 : (language + 1))
                }}>
                <b>{language === 0 ? "EN" : language === 1 ? "RU" : "HY"}</b>
              </li>
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
                <b>
                  {language === 0 ? "Users" : language === 1 ? "Пользователи" : "Օգտագործողներ"}
                </b></li>
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
                <b>
                  {language === 0 ? "Edit user" : language === 1 ? "Редактировать данные пользователя" : "Փոփոխել օգտագործողի տվյալները"}
                </b></li>
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
                <b>
                  {language === 0 ? "Questions" : language === 1 ? "Вопросы" : "Հարցեր"}
                </b></li>
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
                <b>
                  {language === 0 ? "Add or change a questions" : language === 1 ? "Добавить или изменить вопросы" : "Ավելացնել կամ փոփոխել հարցերը"}
                </b></li>
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
                <b>
                  {language === 0 ? "Timer control" : language === 1 ? "Управления таймером" : "Թեստի ժամանակի փոփոխություն"}
                </b></li>
              <li
                onClick={() => {
                  logOut(history)
                }}
              ><b>
                  {(language === 0) ? "Log out" : (language === 1) ? "Выйти" : "Դուրս գալ"}
                </b></li>
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
              languages={language}
            /> : ''}
          {users ? <Users
            setUsers={setUsers}
            languages={language}
            setUser={setUser}
            setNewUsers={setNewUsers}
          /> : ''}
          {questions ? <Questions
            setQuestions={setQuestions}
            languages={language}
            setNewQuestion={setNewQuestion}
            setQuestion={setQuestion}
          /> : ''}
          {newQuestion ? <CreateQuestion
            setQuestions={setQuestions}
            languages={language}
            setNewQuestion={setNewQuestion}
            Question={question}
          /> : ''}
          {questionsTimer ? <QuestionTimer
            languages={language}
          /> : ''}
        </div>
      </div>
    </div>
  )
}

export default Admin;
import React, { useState, useEffect } from 'react';
import adminModule from './admin.module.css'
import Questions from './Questions/questions';
import Users from './Users/users';
import CreateQuestion from './CreateQuestion/createQuestion'
import CreateUser from './CreateUser/createUser';
const Admin = ({ history }) => {
  const [users, setUsers] = useState(false);
  const [newUsers, setNewUsers] = useState(true);
  const [questions, setQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);

  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <div className={adminModule.admin}>
      <header>
        <div className={adminModule.logo}>Questions<span>Admin</span></div>
      </header>
      <div className={adminModule.nav_btn}>Menu</div>
      <div className={adminModule.container}>
        <div className={adminModule.sidebar}>
          <nav>
            <b>Questions<span>Admin</span></b>
            <ul className={adminModule.ul}>
            <li 
              className={newUsers ? adminModule.active : ''}
              onClick={ () =>{ 
                setUsers(false);
                setNewUsers(true);
                setQuestions(false);
                setNewQuestion(false);
              }}>
                  <b>Create user</b></li>
              <li 
              className={users ? adminModule.active : ''}
              onClick={ () =>{ 
                setUsers(true);
                setNewUsers(false);
                setQuestions(false);
                setNewQuestion(false);
              }}>
                  <b>Users</b></li>
              <li 
              className={questions ? adminModule.active : ''}
              onClick={() =>{ 
                setQuestions(true);
                setUsers(false);
                setNewUsers(false);
                setNewQuestion(false);
              }}><b>Questions</b></li>
              <li 
              className={newQuestion ? adminModule.active : ''}
              onClick={() =>{ 
                setNewQuestion(true);
                setUsers(false);
                setQuestions(false);
                setNewUsers(false);
              }}>
                <b>Create question</b></li>
              <li
                onClick={() => {
                   history.push('/') 
                  }}
              ><b>Log out</b></li>
            </ul>
          </nav>
        </div>

        <div className={adminModule.main_content}>
        {newUsers && <CreateUser/>}
          {users && <Users/>}
          {questions && <Questions/>}
          {newQuestion && <CreateQuestion/>}
          </div>
      </div>
    </div>
  )
}

export default Admin;
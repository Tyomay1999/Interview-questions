import React, { useState, useEffect } from 'react';
import { getPreviousQuestionsData } from '../../functions';
import previousQuestionModule from './previousQuestion.module.css'

const PreviousQuestion = ({history}) => {
  const [previous, setPrevious] = useState('');
  const { question, answers, trueAnswers } = previous;
  useEffect(() => {
    getPreviousQuestionsData(setPrevious)
  }, []);

  return (
    <section className={previousQuestionModule.previousQuestion}>
      <h2 className={previousQuestionModule.questionTypeName}>{previous.questionType}</h2>
      <div className={previousQuestionModule.container}>
        <ul className={previousQuestionModule["responsive-table"]}>
          <li className={previousQuestionModule["table-header"]}>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-1']}`}>&#8470;</div>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-2']}`}>Question</div>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-3']}`}>Your answer</div>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-4']}`}>Correct answer</div>
          </li>
          {(previous && question) ? question.map((item, index) => {
            return (
              <li className={previousQuestionModule["table-row"]}>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-1']}`} data-label="&#8470;">{index + 1}</div>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-2']}`} data-label="Question:">{item}</div>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-3']}`} data-label="Your answer:">{answers[index]}</div>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-4']}`} data-label="Correct answer:">{trueAnswers[index]}</div>
              </li>
            )
          }) : 
          <div classNameName={previousQuestionModule.previousResult}>
            <p>You have no previous result</p>
          </div>
          }
        </ul>
      </div>
      <button
        classNameName={previousQuestionModule.homeButton}
        onClick={() => {
          history.push('/questions')
        }}
      >Home</button>
    </section>
  )
}

export default PreviousQuestion;
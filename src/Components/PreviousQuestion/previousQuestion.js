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
      <div class={previousQuestionModule.container}>
        <ul class={previousQuestionModule["responsive-table"]}>
          <li class={previousQuestionModule["table-header"]}>
            <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-1']}`}>&#8470;</div>
            <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-2']}`}>Question</div>
            <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-3']}`}>Your answer</div>
            <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-4']}`}>Correct answer</div>
          </li>
          {previous ? question.map((item, index) => {
            return (
              <li class={previousQuestionModule["table-row"]}>
                <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-1']}`} data-label="&#8470;">{index + 1}</div>
                <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-2']}`} data-label="Question:">{item}</div>
                <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-3']}`} data-label="Your answer:">{answers[index]}</div>
                <div class={`${previousQuestionModule.col} ${previousQuestionModule['col-4']}`} data-label="Correct answer:">{trueAnswers[index]}</div>
              </li>
            )
          }) : 
          <div className={previousQuestionModule.previousResult}>
            <p>You have no previous result</p>
          </div>
          }
        </ul>
      </div>
      <button
        className={previousQuestionModule.homeButton}
        onClick={() => {
          history.push('/questions')
        }}
      >Home</button>
    </section>
  )
}

export default PreviousQuestion;
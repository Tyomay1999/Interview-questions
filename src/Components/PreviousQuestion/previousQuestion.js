import React, { useState, useEffect } from 'react';
import { getPreviousQuestionsData } from '../../functions';
import Loading from '../Loading/loading';
import previousQuestionModule from './previousQuestion.module.css'

const PreviousQuestion = ({ history }) => {
  const [previous, setPrevious] = useState('');
  const [loading, setLoading] = useState(true);
  const [language] = useState(sessionStorage.getItem('language'));
  const { question, answers, trueAnswers } = previous;
  useEffect(() => {
    getPreviousQuestionsData(setPrevious)
    setLoading(!loading)
  }, []);

  if (loading) {
    return <Loading />
  }
  return (
    <section className={previousQuestionModule.previousQuestion}>
      <h2 className={previousQuestionModule.questionTypeName}>{previous.questionType}</h2>
      <div className={previousQuestionModule.container}>
        <ul className={previousQuestionModule["responsive-table"]}>
          <li className={previousQuestionModule["table-header"]}>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-1']}`}>&#8470;</div>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-2']}`}>
              {(language === 'EN') ? "Question" : (language === 'RU') ? "Вопрос " : "Հարց"}
            </div>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-3']}`}>
              {(language === 'EN') ? "Your answer" : (language === 'RU') ? "Ваш ответ " : "Ձեր պատասխանը"}
            </div>
            <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-4']}`}>
              {(language === 'EN') ? "Correct answer" : (language === 'RU') ? "Правильный ответ " : "Ճիշտ պատասխան"}
            </div>
          </li>
          {(previous && question) ? question.map((item, index) => {
            return (
              <li className={previousQuestionModule["table-row"]} key={index}>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-1']}`} data-label="&#8470;">{index + 1}</div>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-2']}`} data-label="Question:">{item}</div>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-3']}`} data-label="Your answer:">{answers[index]}</div>
                <div className={`${previousQuestionModule.col} ${previousQuestionModule['col-4']}`} data-label="Correct answer:">{trueAnswers[index]}</div>
              </li>
            )
          }) :
            <div className={previousQuestionModule.previousResult}>
              <p>
                {(language === 'EN') ? "You haven't previous result" : (language === 'RU') ? "У вас нет предыдущего результата" : "Նախորդ արդյունքը բացակայում է"}
              </p>
            </div>
          }
        </ul>
      </div>
      <button
        className={previousQuestionModule.homeButton}
        onClick={() => {
          history.push('/questions')
        }}
      >
        {(language === 'EN') ? "Back" : (language === 'RU') ? "Назад" : "Վերադառնալ"}
      </button>
    </section>
  )
}

export default PreviousQuestion;
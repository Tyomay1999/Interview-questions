import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import questionResultModule from './questionResult.module.css';

const QuestionResult = ({ history }) => {
  const { answers, trueAnswers, questionType, question } = history.location;
  const [language] = useState(sessionStorage.getItem('language'));

  if (questionType === undefined) {
    return <Redirect to='/notFound' />
  }

  return (
    <section className={questionResultModule.Result}>
      <h2 className={questionResultModule.questionTypeName}>{questionType}</h2>
      <div className={questionResultModule.container}>
        <ul className={questionResultModule["responsive-table"]}>
          <li className={questionResultModule["table-header"]}>
            <div className={`${questionResultModule.col} ${questionResultModule['col-1']}`}>&#8470;</div>
            <div className={`${questionResultModule.col} ${questionResultModule['col-2']}`}>
              {(language === 'EN') ? "Question" : (language === 'RU') ? "Вопрос " : "Հարց"}
            </div>
            <div className={`${questionResultModule.col} ${questionResultModule['col-3']}`}>
              {(language === 'EN') ? "Your answer" : (language === 'RU') ? "Ваш ответ " : "Ձեր պատասխանը"}
            </div>
            <div className={`${questionResultModule.col} ${questionResultModule['col-4']}`}>
              {(language === 'EN') ? "Correct answer" : (language === 'RU') ? "Правильный ответ " : "Ճիշտ պատասխան"}
            </div>
          </li>
          {(questionType && question[0]) ? question.map((item, index) => {
            return (
              <li className={questionResultModule["table-row"]} key={index}>
                <div className={`${questionResultModule.col} ${questionResultModule['col-1']}`} data-label="&#8470;">{index + 1}</div>
                <div className={`${questionResultModule.col} ${questionResultModule['col-2']}`} data-label="Question:">{item}</div>
                <div className={`${questionResultModule.col} ${questionResultModule['col-3']}`} data-label="Your answer:">
                  {
                    (answers[index] !== 'No answer') ? answers[index]
                      :
                      `${(language === 'EN') ? "No answer" : (language === 'RU') ? "Нет ответа" : "Չկա պատասխան "}`
                  }
                </div>
                <div className={`${questionResultModule.col} ${questionResultModule['col-4']}`} data-label="Correct answer:">{trueAnswers[index]}</div>
              </li>
            )
          }) :
            <div className={questionResultModule.result}>
              <p>
                {(language === 'EN') ? "You haven't result" : (language === 'RU') ? "У вас нет результата" : "Աարդյունքը բացակայում է"}
              </p>
            </div>
          }
        </ul>
      </div>
      <button
        className={questionResultModule.homeButton}
        onClick={() => {
          history.push('/questions')
        }}
      >
        {(language === 'EN') ? "Back" : (language === 'RU') ? "Назад" : "Վերադառնալ"}
      </button>
    </section>

  )
}

export default QuestionResult;
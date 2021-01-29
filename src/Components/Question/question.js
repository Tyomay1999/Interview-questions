import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/loading';
import { CompleteAndExit, getData, nextQuestion } from '../../functions'
import { Link } from "react-router-dom";
import questionModule from './question.module.css';
import Header from '../Header/header';


const Question = ({ history, location }) => {
    const { questionType } = location;
    const [questionNum, setQuestionNum] = useState(0);
    const [viewResult, getViewResult] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [trueAnswers, setTrueAnswers] = useState([]);
    const [result, setResult] = useState(false);
    const [resultWindow, setResultWindow] = useState(false);
    const [data, setData] = useState(null);
    const [loading, isLoading] = useState(true);
    const [radioValue, setRadioValue] = useState('');
    const [question, setQuestion] = useState([]);
    const [timerHour, setTimerHour] = useState(0);
    const [timerMinute, setTimerMinute] = useState(29);
    const [timerSecond, setTimerSecond] = useState(59);
    const [language,setLanguage] = useState(sessionStorage.getItem('language'));

    if (!data && questionType) {
        getData(setData, isLoading, loading, questionType, setTimerHour, setTimerMinute)
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timerHour > 0 && !timerMinute && !timerSecond) {
                setTimerHour(timerHour - 1);
                setTimerMinute(59);
                setTimerSecond(59);
            } else if (timerHour > 0 && timerMinute > 0 && !timerSecond) {
                setTimerMinute(timerMinute - 1);
                setTimerSecond(59);
            } else if (timerHour > 0 && !timerMinute && timerSecond > 0) {
                setTimerSecond(timerSecond - 1);
            } else if (timerHour > 0 && timerMinute > 0 && timerSecond > 0) {
                setTimerSecond(timerSecond - 1);
            } else if (!timerHour && !timerMinute && timerSecond > 0) {
                setTimerSecond(timerSecond - 1);
            } else if (!timerHour && timerMinute > 0 && !timerSecond) {
                setTimerMinute(timerMinute - 1);
                setTimerSecond(59);
            } else if (!timerHour && timerMinute > 0 && timerSecond > 0) {
                setTimerSecond(timerSecond - 1);
            } else if (!timerHour && !timerSecond && !timerMinute) {
                CompleteAndExit({
                    setResult,
                    result,
                    trueAnswers,
                    answers,
                    getViewResult,
                    questionType,
                    question
                });
                return clearTimeout(timeout)
            }
        }, 1000);
        if (result) {
            return clearTimeout(timeout)
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [timerSecond, timerMinute,timerHour, result, trueAnswers, answers,questionType,question]);

    if (questionType === undefined) {
        return <Redirect to='/notFound' />
    }
    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
             <Header/>
            <div className={questionModule.question}>
                <div className={result ? `${questionModule.result}` : `${questionModule.close}`}>
                    <div className={questionModule.infoButons} >
                        <div
                            className={resultWindow ? `${questionModule.result}` : `${questionModule.close}`
                            }>
                            <h1>
                            {(language === 'EN') ? `You typed ${viewResult} out of ` : (language === 'RU') ? `Вы набрали ${viewResult} из ` : `Դուք հավաքել եք ${viewResult}/`}

                                 
                            {data[(data.length - 1)].totalQuestion}
                            </h1>
                            <Link
                                className={questionModule.button}
                                to={{
                                    pathname: "/Result",
                                    trueAnswers,
                                    answers,
                                    questionType,
                                    question
                                }}
                            >
                            {(language === 'EN') ? "See your answers to questions" : (language === 'RU') ? "Смотрите ваши ответы на вопросы" : "Մանրամասն"}
                            </Link>
                        </div>
                        <button
                            className={!resultWindow ? `${questionModule.button}` : `${questionModule.close}`}
                            onClick={() => {
                                setResultWindow(!resultWindow)
                            }}>
                        {(language === 'EN') ? "Result" : (language === 'RU') ? "Результат" : "Դիտել արդյունքը"}
                                
                                </button>
                        <Link className={questionModule.button} to='/questions'>
                        {(language === 'EN') ? "Back" : (language === 'RU') ? "Назад" : "Վերադառնալ"}
                        </Link>
                    </div>
                </div>
                <div
                    id={questionModule.modal_container}
                    className={result ? `${questionModule.one} ${questionModule.out}` : `${questionModule.one}`}
                >
                    <div className={questionModule.modal_background} key={questionNum + 1}>
                        <div className={questionModule.modal} >
                            <h2 className={questionModule.questionText} >
                            {(language === 'EN') ? "Question " : (language === 'RU') ? "Вопрос " : "Հարց "}
                            {(questionNum + 1)}/{data[(data.length - 1)].totalQuestion}
                            </h2 >
                            <div className={questionModule.resultQuestion}>
                                {
                                    answers.map((item, index) => {
                                        if (item === trueAnswers[index]) {
                                            return (
                                                <div
                                                    key={index + 3}
                                                    className={questionModule.checkAnswers}
                                                    style={{ background: 'green' }}
                                                ></div>
                                            )
                                        } else {
                                            return (
                                                <div
                                                    key={index + 3}
                                                    className={questionModule.checkAnswers}
                                                    style={{ background: 'red' }}
                                                ></div>
                                            )
                                        }

                                    })
                                }
                            </div>
                            <div className={questionModule.timer}>
                                <h6>
                                    <span className={questionModule.tiem}>
                                        {((timerHour - 9) > 0) ? timerHour : `0${timerHour}`}
                                    </span>
                                :
                                    <span className={questionModule.tiem}>
                                        {((timerMinute - 9) > 0) ? timerMinute : `0${timerMinute}`}
                                    </span>
                                :
                                <span className={questionModule.tiem}>
                                        {((timerSecond - 9) > 0) ? timerSecond : `0${timerSecond}`}
                                    </span>
                                </h6>
                            </div>
                            <h1>
                                {data[questionNum].question}
                            </h1>
                            <code className={questionModule.questionCode} >
                                {
                                    data[questionNum].questionTyupe ? data[questionNum].questionCode.map((line, index) => {
                                        return (
                                            <p key={index}>{line}</p>
                                        )
                                    }) : ''
                                }
                            </code>
                            <div className={questionModule.answers} >
                                <form >
                                    {
                                        data[questionNum].answers ? data[questionNum].answers.map((rad, index) => {
                                            if (rad !== '') {
                                                return (
                                                    <label key={index} >
                                                        <input
                                                            type="radio"
                                                            name="radio"
                                                            value={rad}
                                                            onClick={(e) => { setRadioValue(e.target.value) }}
                                                        />
                                                        <span>
                                                            {rad}
                                                        </span>
                                                    </label>
                                                )
                                            }
                                            return null
                                        })
                                            :
                                    history.push('/questions')
                                    }
                                </form>
                            </div>
                            <div className={questionModule.buttons}>
                                <button
                                    className={questionModule.confirmAnswer}
                                    onClick={() => {
                                        CompleteAndExit({
                                            setResult,
                                            result,
                                            trueAnswers,
                                            answers,
                                            getViewResult,
                                            questionType,
                                            question
                                        });
                                    }}
                                >
                            {(language === 'EN') ? "Complete and exit" : (language === 'RU') ? "Завершить и выйти" : "Ավարտել և դուրս գալ"}
                                </button>
                                <button
                                    className={questionModule.confirmAnswer}
                                    disabled={radioValue ? '' : 'disabled'}
                                    onClick={() => {
                                        nextQuestion({
                                            data,
                                            setRadioValue,
                                            radioValue,
                                            answers,
                                            setAnswers,
                                            trueAnswers,
                                            setTrueAnswers,
                                            questionNum,
                                            setQuestionNum,
                                            result,
                                            setResult,
                                            getViewResult,
                                            totalQuestion: data[(data.length - 1)].totalQuestion,
                                            question,
                                            setQuestion,
                                            questionType
                                        });
                                    }}
                                >
                                    {
                                        (questionNum + 1 < data[(data.length - 1)].totalQuestion) ? 
                                        `${(language === 'EN') ? "Next question" : (language === 'RU') ? "Следующий вопрос" : "Հաջորդ հարցը"}`
                                            : 
                                        `${(language === 'EN') ? "Finish" : (language === 'RU') ? "завершить" : "Ավարտել"}`
                                    }
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Question;

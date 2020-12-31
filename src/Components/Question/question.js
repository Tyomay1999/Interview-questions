import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/loading';
import { CompleteAndExit, getData, nextQuestion } from '../../functions'
import { Link } from "react-router-dom";
import questionModule from './question.module.css';


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
    const [timerMinute, setTimerMinute] = useState(29);
    const [timerSecond, setTimerSecond] = useState(59);
    if (!data && questionType) {
        getData(setData, isLoading, loading, questionType)
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!timerSecond && timerMinute > 0) {
                setTimerMinute(timerMinute - 1);
                setTimerSecond(59)
            } else if (timerMinute && timerSecond) {
                setTimerSecond(timerSecond - 1)
            } else if (timerSecond && !timerMinute) {
                setTimerSecond(timerSecond - 1)
            } else if (!timerSecond && !timerMinute) {
                CompleteAndExit({
                    setResult,
                    result,
                    trueAnswers,
                    answers,
                    getViewResult
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
    }, [timerSecond, timerMinute, result, trueAnswers, answers,]);

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
            <div className={questionModule.question}>
                <div className={result ? `${questionModule.result}` : `${questionModule.close}`}>
                    <div className={questionModule.infoButons} >
                        <div
                            className={resultWindow ? `${questionModule.result}` : `${questionModule.close}`
                            }>
                            <h1>You typed {viewResult} out of {data[(data.length - 1)].totalQuestion}</h1>
                            <Link
                                className={questionModule.button}
                                to={{
                                    pathname: "/Result",
                                    trueAnswers,
                                    answers,
                                    questionType,
                                    question
                                }}
                            >See your answers to questions</Link>
                        </div>
                        <button
                            className={!resultWindow ? `${questionModule.button}` : `${questionModule.close}`}
                            onClick={() => {
                                setResultWindow(!resultWindow)
                            }}>Result</button>
                        <Link className={questionModule.button} to='/questions'>Home</Link>
                    </div>
                </div>
                <div
                    id={questionModule.modal_container}
                    className={result ? `${questionModule.one} ${questionModule.out}` : `${questionModule.one}`}
                >
                    <div className={questionModule.modal_background} key={questionNum + 1}>
                        <div className={questionModule.modal} >
                        <h2 className={questionModule.questionText} >
                                Question {(questionNum + 1)}/{data[(data.length - 1)].totalQuestion}
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
                                        })
                                            : history.push('/questions')}
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
                                            getViewResult
                                        });
                                    }}
                                >
                                    Complete and exit
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
                                            setQuestion
                                        });
                                    }}
                                >
                                    {
                                        (questionNum + 1 < data[(data.length - 1)].totalQuestion) ? 'Next question'
                                            : 'Finish'
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

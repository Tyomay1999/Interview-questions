import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/loading';
import { getData, nextQuestion } from '../../functions'
import { Link } from "react-router-dom";
import questionModule from './question.module.css';
const Question = ({ location }) => {
    const { questionType } = location;
    const [questionNum, setQuestionNum] = useState(15);
    const [viewResult, getViewResult] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [trueAnswers, setTrueAnswers] = useState([]);
    const [result, setResult] = useState(false);
    const [resultWindow, setResultWindow] = useState(false);
    const [data, setData] = useState(null);
    const [loading, isLoading] = useState(true);
    const [radioValue, setRadioValue] = useState('');
    const [question, setQuestion] = useState([]);

    if (!data && questionType) {
        getData(setData, isLoading, loading, questionType)
    }

    if (questionType === undefined) {
        return <Redirect to='/notFound' />
    }
    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={questionModule.question}>
            <div className={result ? `${questionModule.result}` : `${questionModule.close}`}>
                <div className={questionModule.infoButons} >
                    <div
                        className={resultWindow ? `${questionModule.result}` : `${questionModule.close}`
                        }>
                        <h1>You typed {viewResult} out of {data[0].totalQuestion}</h1>
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
            <div id={questionModule.modal_container} className={result ? `${questionModule.one} ${questionModule.out}` : `${questionModule.one}`}>
                <div className={questionModule.modal_background} key={questionNum + 1}>
                    <div className={questionModule.modal} >
                        <div className={questionModule.resultQuestion}>
                            {
                                answers.map((item, index) => {
                                    if (item === trueAnswers[index]) {
                                        return (
                                            <div key={index + 3} className={questionModule.checkAnswers} style={{ background: 'green' }}></div>
                                        )
                                    } else {
                                        return (
                                            <div key={index + 3} className={questionModule.checkAnswers} style={{ background: 'red' }}></div>
                                        )
                                    }

                                })
                            }
                        </div>
                        <h2 className={questionModule.questionText} >Question {(questionNum + 1)}/{data[0].totalQuestion}</h2 >
                        <h1>
                            {data[0].questions[questionNum].question}
                        </h1>
                        <div className={questionModule.questionCode} >
                            {
                                data[0].questions[questionNum].questionTyupe ? data[0].questions[questionNum].questionCode.map((line, index) => {
                                    return (
                                        <p key={index}>{line}</p>
                                    )
                                }) : ''
                            }
                        </div>
                        <div className={questionModule.answers} >
                            <form >
                                {
                                    data[0].questions[questionNum].answers.map((rad, index) => {
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
                                }
                            </form>
                        </div>
                        <button
                            className={questionModule.confirmAnswer}
                            disabled={radioValue ? '' : 'disabled'}
                            onClick={() => {
                                nextQuestion(data, setRadioValue, radioValue, answers, setAnswers, trueAnswers, setTrueAnswers, questionNum, setQuestionNum, result, setResult, getViewResult, data[0].totalQuestion, question, setQuestion)
                            }}
                        >
                            {(questionNum + 1 < data[0].totalQuestion) ? 'Next question' : 'Finish'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Question;

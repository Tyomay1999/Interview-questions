import React, { useState } from 'react';
import Loading from '../Loading/loading';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import questionModal from './question.module.css';
import 'firebase/database';
import 'firebase/auth';
const Question = (prop) => {
    const {location} = prop
    // firebase.database().ref('JavaScript').push()
    // if (!location.staticContext){ return <Redirect to="/" />};
    console.log("======================", location.staticContext)
    const [questionNum, setQuestionNum] = useState(0)
    const [answers, setAnswers] = useState([])
    const [result, setResult] = useState(false)
    const [data, getData] = useState(null)
    const [loading, isLoading] = useState(true)
    const [radioValue, isRadioValue] = useState('')
    console.log("🚀 ~ ````````````~~~~~~~~~~~~~~~~~~~~~~````````````~ radioValue", radioValue)
    if (!data && location.staticContext) {
        // isLoading(!loading)
        firebase.database().ref(`${location.staticContext}`).on("value", question => {
            let questionlist = [];
            question.forEach(item => {
                questionlist.push(item.val());
            });
            getData(questionlist)
            isLoading(!loading)
        });
    }
    const nextQuestion = () => {
        if (data[0].questions[questionNum].next) {
            setQuestionNum((questionNum + 1))
        } else {
            setResult(!result)
        }
    }
    const answersFun = () => {

    }
    const onChangeValue = (event) => {
        console.log(event);
    }
    
    console.log("🚀 ~ file: question.js ~ line 97 ~ Question ~ prop", prop)
    if (loading) {
        return (
            <Loading />
        )
    }

    console.log("🚀 ~ file: question.js ~ line 9 ~ Question ~ data", data[0])

    return (
        <div className={questionModal.question}  >
            <div id={questionModal.modal_container} className={result ? `${questionModal.one} ${questionModal.out}` : `${questionModal.one}`}>
                <div className={questionModal.modal_background} key={questionNum + 1}>
                    <div className={questionModal.modal} >
                        <h2>Question {(questionNum + 1)}/{data[0].totalQuestion}</h2>
                        <h1>
                            {data[0].questions[questionNum].question}
                        </h1>
                        <div className={questionModal.questionCode} >
                            {data[0].questions[questionNum].questionTyupe ? data[0].questions[questionNum].questionCode.map((line, index) => {
                                return (
                                    <p key={index}>{line}</p>
                                )
                            }) : ''
                            }
                        </div>
                        <div className={questionModal.answers}   >
                            <form >
                                {
                                    data[0].questions[questionNum].ansvers.map((rad, index) => {
                                        return (
                                            <label key={index}  >
                                                <input type="radio" name="radio"  value={rad} onClick={(e) => {isRadioValue(e.target.value)}} />
                                                <span>
                                                    {rad}
                                                </span>
                                            </label>
                                        )
                                    })
                                }
                            </form>
                        </div>
                        <button
                            className={questionModal.confirmAnswer}
                            disabled={radioValue? '' : 'disabled'}
                            onClick={() => {
                                nextQuestion()
                            }}
                        >
                            {data[0].questions[questionNum].next ? 'Next question' : 'Finish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Question;
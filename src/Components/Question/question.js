import React, { useState } from 'react';
import Loading from '../Loading/loading';
import '../Login/button.css';
// import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import questionModal from './question.module.css';
import 'firebase/database';
import 'firebase/auth';
const Question = (prop) => {
    const { location } = prop
    // firebase.database().ref('JavaScript').push()
    // if (!location.staticContext){ return <Redirect to="/" />};
    const [questionNum, setQuestionNum] = useState(28);
    const [viewResult, getViewResult] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [trueAnswers, setTrueAnswers] = useState([]);
    const [result, setResult] = useState(false);
    const [data, getData] = useState(null);
    const [loading, isLoading] = useState(true);
    const [radioValue, setRadioValue] = useState('');
    if (!data && location.staticContext) {
        firebase.database().ref(`${location.staticContext}`).on("value", question => {
            let questionlist = [];
            question.forEach(item => {
                questionlist.push(item.val());
            });
            getData(questionlist)
            isLoading(!loading)
        });
    }
    const nextQuestion = (valueInRadio) => {
        answers.push(valueInRadio);
        trueAnswers.push(data[0].questions[questionNum].trueAnsver)
        setAnswers(answers)
        setTrueAnswers(trueAnswers)
        setRadioValue('')
        if (data[0].questions[questionNum].next) {
            setQuestionNum((questionNum + 1))
        } else {
            resultFun()
        }
    }
    const resultFun = () => {
        setResult(!result);
        let trueAnswersOnQuestions = 0;
        trueAnswers.forEach((item,index) => {
        if(item === answers[index]){
            trueAnswersOnQuestions += 1
        }
        });
        getViewResult(trueAnswersOnQuestions)
    }


    if (loading) {
        return (
            <Loading />
        )
    }

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
                        <div className={questionModal.answers} >
                            <form >
                                {
                                    data[0].questions[questionNum].ansvers.map((rad, index) => {
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
                                    })
                                }
                            </form>
                        </div>
                        <button
                            className={questionModal.confirmAnswer}
                            disabled={radioValue ? '' : 'disabled'}
                            onClick={() => {
                                nextQuestion(radioValue)
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
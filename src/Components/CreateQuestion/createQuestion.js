import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import createQuestionModule from './createQuestion.module.css'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
const CreateQuestion = ({ history }) => {
    const [questionType, setQuestionType] = useState('')
    const [question, setQuestion] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer4, setAnswer4] = useState('')
    const [trueAnswer, setTrueAnswer] = useState('')
    const [Errore, setErrore] = useState('')

    const checker = () => {
        let coincidedAnswers = 0;
        let coincidedTrueAnswer = 0;
        const falseArray = [answer1, answer2, answer3, answer4]
        falseArray.forEach((item, index) => {
            for (let i = (index + 1); i < falseArray.length; i++) {
                if (item === falseArray[i]) {
                    coincidedAnswers += 1
                }
            }
        })
        falseArray.forEach(answer => {
            if (trueAnswer === answer) {
                coincidedTrueAnswer += 1
            }
        })

        if (!coincidedAnswers && coincidedTrueAnswer) {
            return true
        } else {
            return false
        }

    }

    const creater = () => {
        if (questionType) {
            if (question && answer1 && answer2 && answer3 && trueAnswer) {
                if (checker()) {
                    firebase.database().ref(questionType).push({
                        answers: [answer1, answer2, answer3, answer4],
                        question: question,
                        questionCode: false,
                        questionType: false,
                        trueAnswer: trueAnswer
                    })
                    setQuestionType('');
                    setQuestion('')
                    setAnswer1('');
                    setAnswer2('');
                    setAnswer3('');
                    setAnswer4('');
                    setTrueAnswer('');
                    setErrore('');
                    history.push('/questions')
                } else {
                    setErrore('No correct answer was found in the answers')
                }
            } else {
                setErrore('Please write all line')
            }
        } else {
            setErrore('Please click to Question Type')
        }
    }

    if (history.location.isLogin === undefined) {
        return <Redirect to='/notFound' />
    }
    return (
        <div className={createQuestionModule.modal}>
            <div className={createQuestionModule.panel}>
                {Errore ? <p>{Errore}</p> : ''}
                <div className={createQuestionModule.questionType}>
                    <p>Question type</p>
                    <div className={createQuestionModule.questionTypeButtons}>
                        <form className={createQuestionModule.forms} onChange={(e) => { setQuestionType(e.target.value) }}>
                            <label >
                                <input type="radio" className={createQuestionModule.questionTypeButton} value="Html" name="QuestionsTyupe" />
                                <span>Html</span>
                            </label>
                            <label >
                                <input type="radio" className={createQuestionModule.questionTypeButton} value="Css" name="QuestionsTyupe" />
                                <span>CSS</span>
                            </label>
                            <label >
                                <input type="radio" className={createQuestionModule.questionTypeButton} value="JavaScript" name="QuestionsTyupe" />
                                <span>JavaScript</span>
                            </label>
                            <label >
                                <input type="radio" className={createQuestionModule.questionTypeButton} value="ReactJS" name="QuestionsTyupe" />
                                <span>ReactJS</span>
                            </label>
                        </form>
                    </div>
                </div>
                <p className={createQuestionModule.questionInput} > Question</p>
                <textarea
                    type="textarea"
                    onChange={(e) => {
                        setQuestion(e.target.value)
                    }}
                    className={createQuestionModule.textarea}
                />
                <p className={createQuestionModule.ansvers}>Answers</p>
                <input
                    type="text"
                    placeholder='Answer1'
                    onChange={(e) => {
                        setAnswer1(e.target.value)
                    }}
                    className={createQuestionModule.questionAnswer
                    } />
                <input
                    type="text"
                    placeholder='Answer2'
                    onChange={(e) => {
                        setAnswer2(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <input
                    type="text"
                    placeholder='Answer3'
                    onChange={(e) => {
                        setAnswer3(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <input
                    type="text"
                    placeholder='Answer4'
                    onChange={(e) => {
                        setAnswer4(e.target.value)

                    }}

                    className={createQuestionModule.questionAnswer}
                />
                <p>True Answer</p>
                <input
                    type="text"
                    placeholder='trueAnswer'
                    onChange={(e) => {
                        setTrueAnswer(e.target.value)

                    }}
                />

                <div className={createQuestionModule.buttons}>
                    <button
                        onClick={() => {
                            setErrore('');
                            creater();
                        }}
                        className={createQuestionModule.button}
                    >Create</button>
                    <button
                        onClick={() => {
                            history.push('/questions')
                        }}
                        className={createQuestionModule.button}
                    >Home</button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion;
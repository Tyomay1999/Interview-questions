import React, { useState, useEffect } from 'react';
import questionsModule from './questions.module.css';
import { firebaseDatabase } from '../../../functions';

const get = (quesType,setQuestionData) => {
    firebaseDatabase().ref(`QuestionType/${quesType.toUpperCase()}/${quesType}`).on("value", question => {
        let questionlist = [];
        question.forEach(item => {
            questionlist.push(item.val());
        });
        questionlist.forEach((item,index) => {
            item.id = index
        })
        setQuestionData(questionlist);
    })
}

const Questions = ({setQuestion,setQuestions,setNewQuestion}) => {
    const [quesType, setQuesType] = useState(`Html`);
    const [questionData, setQuestionData] = useState('');
    const [allQuestionType, setAllQuestionType] = useState([]);

    useEffect(() => {
        firebaseDatabase().ref('QuestionType').on("value", question => {
            let questionsList = [];
            question.forEach(item => {
                questionsList.push(item.val());
            });
            setAllQuestionType(questionsList)
        })
        get(quesType,setQuestionData)
    },[quesType])
    
    return (
        <section className={questionsModule.Questions}>
            <div className={questionsModule.questionTypeButtons}>
                <h2 className={questionsModule.info}>
                    Double click to edit or delete a question
                </h2>
                <h1 className={questionsModule.h1}>{quesType}</h1>
                {allQuestionType.map((item,index) => {
                    return (
                        <button
                            key={index}
                            className={questionsModule.questionTypeButton}
                            onClick={() => { setQuesType(item.name) }}
                        >{item.name}</button>
                    )
                })}
            </div>
            <div className={questionsModule.questionList}>
                {questionData ? questionData.map((item,index) => {
                                const {id,question,answers,trueAnswer,questionCode,questionTyupe} = item
                    return (
                        <div className={questionsModule.questionItem} key={index} onDoubleClick={() => {
                            setQuestion({
                                quesType,
                                question,
                                answers,
                                questionTyupe,
                                questionCode,
                                trueAnswer,
                                id
                            });
                            setQuestions(false);
                            setNewQuestion(true);
                        }}>
                            <div className={questionsModule.itemQuestions}>
                                <h1 className={questionsModule.itemQuestion}>{question}</h1>
                            </div>
                            <div className={questionsModule.questionCode}>
                            {questionData[index].questionTyupe ? questionData[index].questionCode.map((line, i) => {
                                 return (
                                    <p className={questionsModule.questionCod} key={i}>{line}</p>
                                )
                            }) : ""}

                            </div>
                            <div className={questionsModule.itemQuestionAnswers}>
                                <div className={questionsModule.itemTrueAnswers}>
                                    <p className={questionsModule.itemTrueAnswer}>{trueAnswer}</p>
                                </div>
                                <div className={questionsModule.itemAnswers} key={index+1}>
                                    <p className={questionsModule.itemAnswer}>{answers[0]}</p>
                                    <p className={questionsModule.itemAnswer}>{answers[1]}</p>
                                    {
                                        answers[2] && <p className={questionsModule.itemAnswer}>{answers[2]}</p>
                                    }
                                    {
                                        answers[3] && <p className={questionsModule.itemAnswer}>{answers[3]}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    )

                })
                : ""
            }
                            
            </div>
        </section>
    )
}

export default Questions;
import React, { useState, useEffect } from 'react';
import questionsModule from './questions.module.css';
import firebase from 'firebase/app'; 
import 'firebase/database'; 
import 'firebase/auth';
const get = (quesType,setQuestionData) => {
    firebase.database().ref(quesType).on("value", question => {
        let questionlist = [];
        question.forEach(item => {
            questionlist.push(item.val());
        });
        if(questionlist){
            for(let i = 1; i < questionlist.length; i++ ){
                let num = 0;
                questionlist[0].questions.forEach(item => {
                    if(item.question === questionlist[i].question){
                        num += 1
                    }
                })
                if(!num){
                    questionlist[0].questions.push(questionlist[i])
                }
            }
            questionlist[0].totalQuestion = questionlist[0].questions.length
        }
        setQuestionData(questionlist);
    })
}

const Questions = (props) => {
    const [quesType, setQuesType] = useState(`Html`);
    const [questionData, setQuestionData] = useState('');
    useEffect(() => {
        get(quesType,setQuestionData)
    },[quesType])
        // firebase.database().ref('Html/').remove()
    console.log("🚀 ~ file: questions.js ~ line 10 ~ Questions ~ questionData", questionData)
    
    return (
        <section className={questionsModule.Questions}>
            <div className={questionsModule.questionTypeButtons}>
                <h1 className={questionsModule.h1}>{quesType}</h1>
                <button
                    className={questionsModule.questionTypeButton}
                    onClick={() => {setQuesType('Html')}}
                >Html</button>
                <button
                    className={questionsModule.questionTypeButton}
                    onClick={() => {setQuesType('Css')}}
                >Css</button>
                <button
                    className={questionsModule.questionTypeButton}
                    onClick={() => {setQuesType('JavaScript')}}
                >JavaScript</button>
                <button
                    className={questionsModule.questionTypeButton}
                    onClick={() => {setQuesType('ReactJS')}}
                >ReactJS</button>
            </div>
            <div className={questionsModule.questionList}>
                {questionData ? questionData[0].questions.map((item,index) => {
                                const {question,answers,trueAnswer} = item
                    return (
                        <div className={questionsModule.questionItem} key={index}>
                            <div className={questionsModule.itemQuestions}>
                                <h1 className={questionsModule.itemQuestion}>{question}</h1>
                            </div>
                            <div className={questionsModule.questionCode}>
                            {questionData[0].questions[index].questionTyupe ? questionData[0].questions[index].questionCode.map((line, i) => {
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
                                    <p className={questionsModule.itemAnswer}>{answers[2]}</p>
                                    <p className={questionsModule.itemAnswer}>{answers[3]}</p>
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
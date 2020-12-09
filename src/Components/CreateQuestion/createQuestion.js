import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import createQuestionModule from './createQuestion.module.css'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
const CreateQuestion = ({history}) => {
    const [questionType, setQuestionType] = useState('')
    const [question, setQuestion] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer4, setAnswer4] = useState('')
    const [trueAnswer, setTrueAnswer] = useState('')
    const [Errore, setErrore] = useState('')
    
    const creater = () => {
        if(questionType === 'JavaScript' || questionType=== 'React'){
            if(question && answer1 && answer2 && trueAnswer){
                firebase.database().ref(questionType).push({
                    ansvers:[answer1,answer2,answer3,answer4],
                    question:question,
                    questionCode:false,
                    questionType:false,
                    trueAnsver:trueAnswer
                })
                setErrore('');    
            }else{
                setErrore('Please write all line')
            }
        }else{
            setErrore('Please write Question Type')
        }
    }
    
    if(history.location.isLogin == undefined){
        return <Redirect to='/notFound' />
    }
    return (
        <div className={createQuestionModule.modal}>
            <div className={createQuestionModule.panel}>
                {Errore ? <p>{Errore}</p> : ''}
            <input 
                type="text"
                placeholder='React or JavaScript'
                onChange={(e) => {
                    setQuestionType(e.target.value)
                }}
                className={createQuestionModule.questionAnswer
                  }/>
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
                  }/>
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

            <button 
            onClick={() => {creater()}}
            className={createQuestionModule.button}
            >Create</button>
            </div>
        </div>
    )
}

export default CreateQuestion;
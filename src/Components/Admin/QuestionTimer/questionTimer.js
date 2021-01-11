import React, { useState, useEffect } from 'react';
import questionTimerModule from './questionsTimer.module.css';
import { plus, minus, getQuestionsTimerInfo, changeQuestionTimer } from '../../../functions'

const QuestionTimer = () => {
    const [time, setTimer] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(30);
    const [data,setData] = useState([]);
    const [questionName,setQuestionName] = useState('Question Name');
    
    useEffect(() => {
        getQuestionsTimerInfo(setData)
    }, [time]);

    return (
        <section className={questionTimerModule.container}>
           {
                data.map(({name,timer})=> {
                    return (
                        <div className={`${questionTimerModule.card} ${questionTimerModule['card-1']}`}>
                            <h1>{name}</h1>
                            <h2>{(timer.hour > 10) ? timer.hour : `0${timer.hour}`}h:{(timer.minute > 10) ? timer.minute : `0${timer.minute}`}m:00s</h2>
                            <button
                                id={questionTimerModule.three}
                                className={questionTimerModule.button}
                                onClick={() => {
                                    setHour(timer.hour);
                                    setMinute(timer.minute);
                                    setQuestionName(name)
                                    setTimer(!time);
                                }}
                            >{time ? 'Ok' : 'Change timer'}</button>
                        </div>
                    )
                })
           }
            <div className={time ? questionTimerModule.modale : questionTimerModule.modal} id={questionTimerModule['modal-name']}>
                <div className={questionTimerModule['modal-sandbox']}></div>
                <div className={questionTimerModule['modal-box']}>
                    <div className={questionTimerModule['modal-header']}>
                        <h1>{questionName}</h1>
                    </div>
                    <div className={questionTimerModule['modal-body']}>
                        <p>initial time 30 min</p>
                        <div className={questionTimerModule.hour} data-label="Correct answer:">
                            <p>Hour:</p>
                            <input
                                type='submit'
                                value='+'
                                onClick={() => {
                                    setHour(plus(hour))
                                }}
                                className={questionTimerModule.plus}
                            />
                            <input
                                type='number'
                                onChange={(e) => {
                                    (e.target.value) ? setHour(e.target.value) : setHour(0)
                                }}
                                value={(+hour)}
                                className={questionTimerModule.input}
                            />
                            <input
                                type='submit'
                                value='-'
                                onClick={() => {
                                    setHour(minus(hour))
                                }}
                                className={questionTimerModule.minus}
                            />
                        </div>
                        <div className={questionTimerModule.minute}>
                            <p>Minute:</p>
                            <input
                                type='submit'
                                value='+'
                                onClick={() => {
                                    setMinute(plus(minute))
                                }}
                                className={questionTimerModule.plus}
                            />
                            <input 
                                type='number'
                                onChange={(e) => {
                                    (e.target.value) ? setMinute(e.target.value) : setMinute(30)
                                }} 
                                value={(+minute)}
                                className={questionTimerModule.input}
                            />
                            <input
                                type='submit'
                                value='-'
                                onClick={() => {
                                    setMinute(minus(minute))
                                }}
                                className={questionTimerModule.minus}
                            />
                        </div>
                        <div className={questionTimerModule.buttons}>
                            <button
                                className={questionTimerModule['close-modal']}
                                onClick={() => {
                                    setTimer(!time)
                                }}
                            >Close!</button>
                            <button
                                className={questionTimerModule['close-modal']}
                                onClick={() => {
                                    changeQuestionTimer(questionName,hour,minute)
                                    setTimer(!time)
                                }}
                            >Change</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default QuestionTimer;
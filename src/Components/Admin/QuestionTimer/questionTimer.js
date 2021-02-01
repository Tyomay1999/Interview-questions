import React, { useState, useEffect } from 'react';
import questionTimerModule from './questionsTimer.module.css';
import { plus, minus, getQuestionsTimerInfo, changeQuestionTimer } from '../../../functions';

const QuestionTimer = ({ languages }) => {
    const [time, setTimer] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(30);
    const [data, setData] = useState([]);
    const [questionName, setQuestionName] = useState('Question Name');
    const [complexity, setComplexity] = useState('Easy');
    const [language, getLanguage] = useState(languages);
    // const [loading, setLoading] = useState(true);


    useEffect(() => {
        getQuestionsTimerInfo(setData)
        getLanguage(languages)
    }, [time, languages]);

    return (
        <section className={questionTimerModule.wrapper}>
            <div className={questionTimerModule.complexity}>
                <button className={questionTimerModule.questionTypeButton}
                    disabled={(complexity === 'Easy') ? true : false}
                    onClick={() => {
                        setComplexity("Easy")
                    }}
                >
                    {(language === 0) ? "Easy" : (language === 1) ? "Лёгкий " : "Հեշտ"}
                </button>
                <button className={questionTimerModule.questionTypeButton}
                    disabled={(complexity === 'Normal') ? true : false}
                    onClick={() => {
                        setComplexity("Normal")
                    }}
                >
                    {(language === 0) ? "Normal" : (language === 1) ? "Нормальный " : "Նորմալ"}
                </button>
                <button className={questionTimerModule.questionTypeButton}
                    disabled={(complexity === 'Hard') ? true : false}
                    onClick={() => {
                        setComplexity("Hard")
                    }}
                >
                    {(language === 0) ? "Hard" : (language === 1) ? "Сложный " : "Բարդ"}
                </button>
            </div>
            <div className={questionTimerModule.container}>
                {
                    data.map((item, index) => {
                        if (item.complexity && item.complexity[`${complexity}`]) {
                            let name = item.name,
                                timer = item.complexity[`${complexity}`].timer
                            return (
                                <div className={`${questionTimerModule.card} ${questionTimerModule['card-1']}`} key={index}>
                                    <h1>{name}</h1>
                                    <h2>
                                        {(timer.hour > 10) ? timer.hour : `0${timer.hour}`}
                                        {(language === 0) ? "h:" : (language === 1) ? "ч:" : "ժ:"}
                                        {(timer.minute > 10) ? timer.minute : `0${timer.minute}`}
                                        {(language === 0) ? "m:00s" : (language === 1) ? "м:00с" : "ր:00վ"}
                                    </h2>
                                    <button
                                        id={questionTimerModule.three}
                                        className={questionTimerModule.button}
                                        onClick={() => {
                                            setHour(timer.hour);
                                            setMinute(timer.minute);
                                            setQuestionName(name)
                                            setTimer(!time);
                                        }}
                                    >
                                        {time ? 'Ok' :
                                            (language === 0) ? "Change timer" :
                                                (language === 1) ? "Сменить таймер" : "Փոփոխել ժամանակահատվածը"}
                                    </button>
                                </div>
                            )
                        }
                        return null
                    })
                }
                <div
                    className={time ? questionTimerModule.modale : questionTimerModule.modal}
                    id={questionTimerModule['modal-name']}
                >
                    <div className={questionTimerModule['modal-sandbox']}></div>
                    <div className={questionTimerModule['modal-box']}>
                        <div className={questionTimerModule['modal-header']}>
                            <h1>{questionName}</h1>
                        </div>
                        <div className={questionTimerModule['modal-body']}>
                            <p>
                                {(language === 0) ? "Initial time 30 min" : (language === 1) ? "Начальное время 30 мин." : "Սկզբնական ժամանակը 30ր"}
                            </p>
                            <div className={questionTimerModule.hour} data-label="Correct answer:">
                                <p>
                                    {(language === 0) ? "Hour:" : (language === 1) ? "Час:" : "Ժամ ՝"}
                                </p>
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
                                        (e.target.value) ? setHour(+(e.target.value)) : setHour(0)
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
                                <p>
                                    {(language === 0) ? "Minute:" : (language === 1) ? "Минуты:" : "Րոպե ՝"}
                                </p>
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
                                        (+(e.target.value) !== 0 && (typeof (+(e.target.value)) === 'number')) ?
                                            setMinute(+(e.target.value)) : setMinute(30)
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
                                >
                                    {(language === 0) ? "Close!" : (language === 1) ? "Закрыть!" : "Փակել!"}
                                </button>
                                <button
                                    className={questionTimerModule['close-modal']}
                                    onClick={() => {
                                        changeQuestionTimer(questionName, hour, minute, complexity)
                                        setTimer(!time)
                                    }}
                                >
                                    {(language === 0) ? "Save" : (language === 1) ? "Сохранить" : "Հաստատել"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default QuestionTimer;
import React, { useState, useEffect } from 'react';
import questionsModule from './questions.module.css';
import { firebaseDatabase } from '../../../functions';

const get = (quesType, setQuestionData,complexity,language) => {
    let languages = (language === 0) ? "EN" : (language === 1) ? "RU" : "HY";
    firebaseDatabase().ref(`QuestionType/${quesType.toUpperCase()}/complexity/${complexity}/${languages}`).on("value", question => {
        let questionlist = [];
        question.forEach(item => {
            questionlist.push(item.val());
        });
        questionlist.forEach((item, index) => {
            item.id = index
        })
        setQuestionData(questionlist);
    })
}

const Questions = ({ setQuestion, setQuestions, setNewQuestion, languages }) => {
    const [quesType, setQuesType] = useState(`Html`);
    const [questionData, setQuestionData] = useState('');
    const [allQuestionType, setAllQuestionType] = useState([]);
    const [language, setLanguage] = useState(languages);
    const [complexity, setComplexity] = useState('Easy');

    useEffect(() => {
        firebaseDatabase().ref('QuestionType').on("value", question => {
            let questionsList = [];
            question.forEach(item => {
                questionsList.push(item.val());
            });
            setAllQuestionType(questionsList)
        })
        setLanguage(languages)
        get(quesType, setQuestionData,complexity,language)
    }, [quesType, languages,complexity,language])

    return (
        <section className={questionsModule.Questions}>
            <div className={questionsModule.questionTypeButtons}>
                <h2 className={questionsModule.info}>
                    {(language === 0) ? "Double click to change or remove question"
                        : (language === 1) ? "Дважды щелкните мышью, чтобы изменить или удалить вопрос"
                            : "Կատարեք մկնիկի կրկնակի սեղմում, հարցը փոփոխելու համար"}
                </h2>
                <h1 className={questionsModule.h1}>{quesType}</h1>
                <div className={questionsModule.complexity}>
                    <button className={questionsModule.questionTypeButton}
                            disabled={(complexity === 'Easy') ? true : false}
                            onClick={() => {
                                setComplexity("Easy")
                            }}
                    >
                    {(language === 0) ? "Easy" : (language === 1) ? "Лёгкий " : "Հեշտ"}
                    </button>
                    <button className={questionsModule.questionTypeButton}
                            disabled={(complexity === 'Normal') ? true : false}
                            onClick={() => {
                                setComplexity("Normal")
                            }}
                    >
                    {(language === 0) ? "Normal" : (language === 1) ? "Нормальный " : "Նորմալ"}
                    </button>
                    <button className={questionsModule.questionTypeButton}
                            disabled={(complexity === 'Hard') ? true : false}
                            onClick={() => {
                                setComplexity("Hard")
                            }}
                    >
                    {(language === 0) ? "Hard" : (language === 1) ? "Сложный " : "Բարդ"}
                    </button>
                </div>
                <div className={questionsModule.quesTypes}>
                {allQuestionType.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className={questionsModule.questionTypeButton}
                            onClick={() => { setQuesType(item.name) }}
                        >{item.name}</button>
                    )
                })}
                </div>
            </div>
            <div className={questionsModule.questionList}>
                {questionData ? questionData.map((item, index) => {
                    const { id, question, answers, trueAnswer, questionCode, questionTyupe } = item
                    return (
                        <div className={questionsModule.questionItem} key={index} onDoubleClick={() => {
                            setQuestion({
                                quesType,
                                question,
                                answers,
                                questionTyupe,
                                questionCode,
                                trueAnswer,
                                id,
                                complexity,
                                language
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
                                <div className={questionsModule.itemAnswers} key={index + 1}>
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
import React, { useEffect, useState } from 'react';
import questionType from './questionType.module.css';
import { Link } from "react-router-dom";
import { firebaseDatabase } from '../../functions'
import Header from '../Header/header';
import Loading from '../Loading/loading';

const QuestionType = () => {
    const [loading, setLoading] = useState(true);
    const [dataQuestionType, setDataQuestionType] = useState([]);
    const [language, setLanguage] = useState(sessionStorage.language);
    const [complexity, setComplexity] = useState('Easy');


    useEffect(() => {
        firebaseDatabase().ref('QuestionType').on("value", question => {
            let questionsTypes = [];
            question.forEach(item => {
                questionsTypes.push(item.val());
            });
            setDataQuestionType(questionsTypes);
            setLoading(false)
        })
    }, [loading])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header
                language={language}
                setLanguage={setLanguage}
            />
            <section className={questionType.questionType}>
                <div className={questionType.complexity}>
                    <button
                        disabled={complexity === "Easy" ? true : false}
                        onClick={() => {
                            setComplexity('Easy')
                        }}
                    >
                        {(language === 'EN') ? "Easy" : (language === 'RU') ? "Лёгкий " : "Հեշտ"}
                    </button>
                    <button
                        disabled={complexity === "Normal" ? true : false}
                        onClick={() => {
                            setComplexity("Normal")
                        }}
                    >
                        {(language === 'EN') ? "Normal" : (language === 'RU') ? "Нормальный " : "Նորմալ"}
                    </button>
                    <button
                        disabled={complexity === "Hard" ? true : false}
                        onClick={() => {
                            setComplexity("Hard")
                        }}
                    >
                        {(language === 'EN') ? "Hard" : (language === 'RU') ? "Сложный " : "Բարդ"}
                    </button>
                </div>
                <div className={questionType.courses_container}>
                    {dataQuestionType.map((item, index) => {
                        return (
                            <div className={questionType.courses_container} key={index}>
                                <div className={questionType.course}>
                                    <div className={questionType.course_preview}>
                                        {/* <h6 className={questionType.textQuestionType}>
                                            {(language === 'EN') ? "Number" : (language === 'RU') ? "Номер " : "Համար"}
                                        </h6> */}
                                        <h6 className={questionType.textQuestionTypeNum}>
                                        {(language === 'EN') ?  complexity 
                                        
                                        : (language === 'RU') ? (complexity === "Easy" ) ? "Лёгкий" 
                                        
                                        : ((complexity === "Normal") ? "Нормальный" : "Сложный") 
                                        
                                        : (language === 'HY') ? (complexity === "Easy" ) ? "Հեշտ" 
                                        
                                        : ((complexity === "Normal") ? "Նորմալ" : "Բարդ") : ''
                                        
                                        }
                                            
                                            </h6>
                                    </div>
                                    <div className={questionType.course_info}>
                                        <h2 className={questionType.textQuestionTypes}>{item.name}</h2>
                                        <Link
                                            className={questionType.btns}
                                            to={{
                                                pathname: "/question",
                                                questionType: `${item.name}`,
                                                complexity
                                            }}>
                                            {(language === 'EN') ? "Start" : (language === 'RU') ? "Начать" : "Սկսել"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section >
        </>
    )
}
export default QuestionType;
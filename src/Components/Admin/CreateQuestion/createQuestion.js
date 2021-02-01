import React, { useEffect, useState } from 'react';
import createQuestionModule from './createQuestion.module.css'
import { creater, editQuestion, deleteQuestion, addQuestionType, deleteQuestionType,firebaseDatabase } from '../../../functions';

const CreateQuestion = (props) => {
    const { setQuestions, setNewQuestion, Question,languages } = props;
    const [language, getLanguage] = useState(languages);
    const [allQuestionType, setAllQuestionType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [addedQuestionType, setAddedQuestionType] = useState('');
    const [questionType, setQuestionType] = useState(Question ? Question.quesType : '');
    const [trueAnswer, setTrueAnswer] = useState(Question ? Question.trueAnswer : '');
    const [question, setQuestion] = useState(Question ? Question.question : '');
    const [answer1, setAnswer1] = useState(Question ? Question.answers[0] : '');
    const [answer2, setAnswer2] = useState(Question ? Question.answers[1] : '');
    const [answer3, setAnswer3] = useState(Question ? (Question.answers[2] ? Question.answers[2] : '') : '');
    const [answer4, setAnswer4] = useState(Question ? (Question.answers[3] ? Question.answers[3] : '') : '');
    const [newData, setNewData] = useState([]);
    const [Errore, setErrore] = useState('');
    const [complexity, setComplexity] = useState(props.complexity ? props.complexity : Question.complexity ? Question.complexity : 'Easy');
    const [id] = useState(Question ? Question.id : 0);


    useEffect(() => {
        firebaseDatabase().ref('QuestionType').on("value", question => {
            let questionsList = [];
            question.forEach(item => {
                questionsList.push(item.val());
            });
            setAllQuestionType(questionsList)
        })
        getLanguage(languages)
    }, [loading,languages])

    return (
        <div className={createQuestionModule.modal}>
            <div className={createQuestionModule.panel}>
                {Errore ? <p className={createQuestionModule.errore}>{Errore}</p> : ''}
                <div className={createQuestionModule.complexity}>
                <button className={createQuestionModule.questionTypeButton}
                            disabled={(complexity === 'Easy') ? true : false}
                            onClick={() => {
                                setComplexity("Easy")
                            }}
                    >
                    {(language === 0) ? "Easy" : (language === 1) ? "Лёгкий " : "Հեշտ"}
                    </button>
                    <button className={createQuestionModule.questionTypeButton}
                                disabled={(complexity === 'Normal') ? true : false}
                            onClick={() => {
                                setComplexity("Normal")
                            }}
                    >
                    {(language === 0) ? "Normal" : (language === 1) ? "Нормальный " : "Նորմալ"}
                    </button>
                    <button className={createQuestionModule.questionTypeButton}
                                disabled={(complexity === 'Hard') ? true : false}
                            onClick={() => {
                                setComplexity("Hard")
                            }}
                    >
                    {(language === 0) ? "Hard" : (language === 1) ? "Сложный " : "Բարդ"}
                    </button>
                </div>
                <div className={createQuestionModule.questionType}>
                    <p>{questionType ? questionType :
                        (language === 0) ? "Question type" :
                        (language === 1) ? "Тип вопроса" : "Հարցի տեսակը"}
                    </p>
                    <div className={createQuestionModule.questionTypeButtons}>
                        <form
                            className={createQuestionModule.forms}
                            onChange={(e) => { setQuestionType(e.target.value) }}
                        >
                            {allQuestionType.map((item, index) => {
                                if (questionType && (item.name === questionType)) {
                                    return (
                                        <label key={index + 1}>
                                            <input
                                                defaultChecked
                                                type="radio"
                                                className={createQuestionModule.questionTypeButton}
                                                value={item.name}
                                                name="QuestionsTyupe"
                                            />
                                            <span>{item.name}</span>
                                        </label>
                                    )
                                } else {
                                    return (
                                        <label key={index + 1}>
                                            <input
                                                type="radio"
                                                className={createQuestionModule.questionTypeButton}
                                                value={item.name}
                                                name="QuestionsTyupe"
                                            />
                                            <span>{item.name}</span>
                                        </label>
                                    )
                                }
                            })}
                        </form>
                        <button
                            disabled={addedQuestionType ? true : false}
                            onClick={() => {
                                setShowInput(!showInput)
                            }}
                            className={createQuestionModule.button}
                        >{showInput ?  (language === 0) ? "Close" : (language === 1) ? "Закрыть" : "Փակել"
                        : (language === 0) ? "Add" : (language === 1) ? "Добавить" : "Ավելացնել"}</button>
                        <input
                            placeholder={(language === 0) ? "Write question type" : (language === 1) ? "Напишите тип вопроса" : "Գրեք հարցի տեսակը"}
                            onChange={(e) => {
                                setAddedQuestionType(e.target.value)
                            }}
                            type='text'
                            className={
                                showInput ? createQuestionModule.questionTypeInput : createQuestionModule.inputQuestionType
                            } />
                    </div>
                </div>
                <p className={createQuestionModule.questionInput} >
                    {(language === 0) ? "Question" : (language === 1) ? "Вопрос" : "Հարց"}
                </p>
                <textarea
                    disabled={showInput ? true : false}
                    type="textarea"
                    placeholder={(language === 0) ? "Question" : (language === 1) ? "Вопрос" : "Հարց"}
                    value={question}
                    onChange={(e) => {
                        setQuestion(e.target.value)
                    }}
                    className={createQuestionModule.textarea}
                />
                <p className={createQuestionModule.ansvers}>
                {(language === 0) ? "Options" : (language === 1) ? "Варианты" : "Տարբերակներ"}
                </p>
                <input
                    disabled={showInput ? true : (question ? false : true)}
                    type="text"
                    placeholder={(language === 0) ? "Option N1" : (language === 1) ? "Вариант N1" : "Տարբերակ N1"}
                    value={answer1}
                    onChange={(e) => {
                        setAnswer1(e.target.value)
                    }}
                    className={createQuestionModule.questionAnswer
                    } />
                <input
                    disabled={showInput ? true : (answer1 ? false : true)}
                    type="text"
                    placeholder={(language === 0) ? "Option N2" : (language === 1) ? "Вариант N2" : "Տարբերակ N2"}
                    value={answer2}
                    onChange={(e) => {
                        setAnswer2(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <input
                    disabled={showInput ? true : (answer2 ? false : true)}
                    type="text"
                    placeholder={(language === 0) ? "Option N3" : (language === 1) ? "Вариант N3" : "Տարբերակ N3"}
                    value={answer3}
                    onChange={(e) => {
                        setAnswer3(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <input
                    disabled={showInput ? true : (answer3 ? false : true)}
                    type="text"
                    placeholder={(language === 0) ? "Option N4" : (language === 1) ? "Вариант N4" : "Տարբերակ N4"}
                    value={answer4}
                    onChange={(e) => {
                        setAnswer4(e.target.value)

                    }}

                    className={createQuestionModule.questionAnswer}
                />
                <p className={createQuestionModule.trueAnswere}>
                    {(language === 0) ? "Correct option" : (language === 1) ? "Правильный вариант" : "Ճիշտ տարբերակ"}
                </p>
                <input
                    disabled={showInput ? true : (answer2 ? false : true)}
                    type="text"
                    placeholder={(language === 0) ? "Correct option" : (language === 1) ? "Правильный вариант" : "Ճիշտ տարբերակ"}
                    value={trueAnswer}
                    onChange={(e) => {
                        setTrueAnswer(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <div className={createQuestionModule.buttons}>
                    <button
                        disabled={Question ? true : false}
                        onClick={() => {
                            if (showInput) {
                                addQuestionType({
                                    addedQuestionType,
                                    setAddedQuestionType,
                                    setShowInput,
                                    complexity
                                });
                            } else {
                                setLoading(!loading)
                                setErrore('');
                                creater({
                                    questionType,
                                    question,
                                    answer1,
                                    answer2,
                                    answer3,
                                    answer4,
                                    trueAnswer,
                                    setQuestionType,
                                    setQuestion,
                                    setAnswer1,
                                    setAnswer2,
                                    setAnswer3,
                                    setAnswer4,
                                    setTrueAnswer,
                                    setErrore,
                                    newData,
                                    setNewData,
                                    setQuestions,
                                    setNewQuestion,
                                    complexity,
                                    language
                                });
                            }
                        }}
                        className={createQuestionModule.button}
                    >
                        {(language === 0) ? "Add" : (language === 1) ? "Добавить" : "Ավելացնել"}
                    </button>
                    <button
                        disabled={Question ? false : true}
                        onClick={() => {
                            editQuestion({
                                questionType,
                                question,
                                answer1,
                                answer2,
                                answer3,
                                answer4,
                                trueAnswer,
                                setQuestionType,
                                setQuestion,
                                setAnswer1,
                                setAnswer2,
                                setAnswer3,
                                setAnswer4,
                                setTrueAnswer,
                                setErrore,
                                id,
                                setQuestions,
                                setNewQuestion,
                                complexity,
                                language
                            })
                        }}
                        className={createQuestionModule.button}
                    >
                        {(language === 0) ? "Save the change" : (language === 1) ? "Сохраните изменение" : "Պահպանել փոփոխությունը"}
                    </button>
                    <button
                        disabled={(Question || questionType) ? false : true}
                        onClick={() => {
                            if (questionType && !question) {
                                deleteQuestionType({
                                    questionType,
                                    setQuestions,
                                    setNewQuestion
                                })
                            } else if (questionType && (id || id === 0)) {
                                deleteQuestion({
                                    questionType,
                                    setQuestions,
                                    setNewQuestion,
                                    id,
                                    complexity,
                                    language
                                })
                            }
                        }}
                        className={createQuestionModule.button}
                    >
                        {(language === 0) ? "Delete" : (language === 1) ? "Удалить" : "Ջնջել"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion;
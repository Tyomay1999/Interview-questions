import React, { useEffect, useState } from 'react';
import createQuestionModule from './createQuestion.module.css'
import { creater, editQuestion, deleteQuestion, addQuestionType, deleteQuestionType,firebaseDatabase } from '../../../functions';

const CreateQuestion = (props) => {
    const { setQuestions, setNewQuestion, Question } = props;
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
    const [id, setId] = useState(Question ? Question.id : 0);

    useEffect(() => {
        firebaseDatabase().ref('QuestionType').on("value", question => {
            let questionsList = [];
            question.forEach(item => {
                questionsList.push(item.val());
            });
            setAllQuestionType(questionsList)
        })
    }, [loading])

    return (
        <div className={createQuestionModule.modal}>
            <div className={createQuestionModule.panel}>
                {Errore ? <p>{Errore}</p> : ''}
                <div className={createQuestionModule.questionType}>
                    <p>{questionType ? questionType : 'Question type'}</p>
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
                            onClick={() => {
                                setShowInput(!showInput)
                            }}
                        >{showInput ? "Close" : "Add"}</button>
                        <input
                            onChange={(e) => {
                                setAddedQuestionType(e.target.value)
                            }}
                            type='text'
                            className={
                                showInput ? createQuestionModule.questionTypeInput : createQuestionModule.inputQuestionType
                            } />
                    </div>
                </div>
                <p className={createQuestionModule.questionInput} >Question</p>
                <textarea
                    disabled={showInput ? true : false}
                    type="textarea"
                    placeholder='Question'
                    value={question}
                    onChange={(e) => {
                        setQuestion(e.target.value)
                    }}
                    className={createQuestionModule.textarea}
                />
                <p className={createQuestionModule.ansvers}>Answers</p>
                <input
                    disabled={showInput ? true : (question ? false : true)}
                    type="text"
                    placeholder='Answer N1'
                    value={answer1}
                    onChange={(e) => {
                        setAnswer1(e.target.value)
                    }}
                    className={createQuestionModule.questionAnswer
                    } />
                <input
                    disabled={showInput ? true : (answer1 ? false : true)}
                    type="text"
                    placeholder='Answer N2'
                    value={answer2}
                    onChange={(e) => {
                        setAnswer2(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <input
                    disabled={showInput ? true : (answer2 ? false : true)}
                    type="text"
                    placeholder='Answer N3'
                    value={answer3}
                    onChange={(e) => {
                        setAnswer3(e.target.value)

                    }}
                    className={createQuestionModule.questionAnswer}
                />
                <input
                    disabled={showInput ? true : (answer3 ? false : true)}
                    type="text"
                    placeholder='Answer N4'
                    value={answer4}
                    onChange={(e) => {
                        setAnswer4(e.target.value)

                    }}

                    className={createQuestionModule.questionAnswer}
                />
                <p>True Answer</p>
                <input
                    disabled={showInput ? true : (answer2 ? false : true)}
                    type="text"
                    placeholder='True answer'
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
                                    setShowInput
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
                                    setNewQuestion
                                });
                            }
                        }}
                        className={createQuestionModule.button}
                    >Create</button>
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
                                setNewQuestion
                            })
                        }}
                        className={createQuestionModule.button}
                    >Edite</button>
                    <button
                        disabled={Question ? false : true}
                        onClick={() => {
                            if (questionType && !question) {
                                deleteQuestionType({
                                    questionType,
                                    setQuestions,
                                    setNewQuestion
                                })
                            } else if (questionType && id) {
                                deleteQuestion({
                                    questionType,
                                    setQuestions,
                                    setNewQuestion,
                                    id
                                })
                            }
                        }}
                        className={createQuestionModule.button}
                    >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion;
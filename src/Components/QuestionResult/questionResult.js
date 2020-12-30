import React from 'react';
import { Redirect } from 'react-router-dom';
import questionResultModule from './questionResult.module.css'
const QuestionResult = ({ history }) => {
    const { answers, trueAnswers, questionType, question } = history.location
    if (questionType === undefined) {
        return <Redirect to='/notFound' />
    }

    return (
        <>
            <section className={questionResultModule.Result}>
                <h1>{(questionType)}</h1>
                <div className={questionResultModule.tbl_header}>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Question Num</th>
                                <th>Question</th>
                                <th>Your answer</th>
                                <th>Correct answer</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className={questionResultModule.tbl_content}>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {
                                question.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p className={questionResultModule.question}>{item}</p>
                                            </td>
                                            <td>{answers[index]}</td>
                                            <td>{trueAnswers[index]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={() => {
                        history.push('/questions')
                    }}
                >Home</button>
            </section>
        </>

    )
}

export default QuestionResult;
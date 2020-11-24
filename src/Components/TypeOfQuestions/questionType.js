import React from 'react';
import questionType from './questionType.module.css';


const QuestionType = ({history}) => {
    return (
        <section className={questionType.questionType}>
            <div className={questionType.courses_container}>
                <div className={questionType.course}>
                    <div className={questionType.course_preview}>
                        <h6>Question</h6>
                        <h2>1</h2>
                    </div>
                    <div className={questionType.course_info}>
                        <h2>JavaScript Advanced</h2>
                        <button className={questionType.btns} onClick={() => {history.push('/question')}}>Start</button>
                    </div>
                </div>
            </div>
            <div className={questionType.courses_container}>
                <div className={questionType.course}>
                    <div className={questionType.course_preview}>
                        <h6>Question</h6>
                        <h2>2</h2>
                    </div>
                    <div className={questionType.course_info}>
                        <h2>React JS</h2>
                        <button className={questionType.btns} onClick={() => {history.push('/question')}}>Start</button>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default QuestionType;
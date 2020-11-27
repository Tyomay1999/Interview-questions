import React from 'react';
import questionType from './questionType.module.css';
import { Link } from "react-router-dom";


const QuestionType = () => {
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
                        <Link 
                        className={questionType.btns}
                        to={{
                            pathname: "/question",
                            staticContext: 'JavaScript'
                        }}>Start</Link>
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
                        <Link 
                        className={questionType.btns}
                        to={{
                            pathname: "/question",
                            staticContext: 'ReactJS'
                        }}>Start</Link>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default QuestionType;
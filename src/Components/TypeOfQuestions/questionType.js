import React from 'react';
import questionType from './questionType.module.css';
import { Link } from "react-router-dom";


const QuestionType = (prop) => {
console.log("🚀 ~ file: questionType.js ~ line 7 ~ QuestionType ~ prop", prop)
    // if(prop.history.location.isLogin == undefined){
    //     return <Redirect to='/notFound' />
    // }
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
                                questionType: 'JavaScript'
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
                                questionType: 'ReactJS'
                            }}>Start</Link>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default QuestionType;
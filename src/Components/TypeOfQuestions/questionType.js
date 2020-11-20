import React from 'react';
import questionType from './questionType.module.css';
import { Link } from "react-router-dom"


const QuestionType = () => {
    return (
        <section className={questionType.questionType}>
            <div className={questionType.wrapper}>
                <div className={questionType.box}>
                    <Link to='/JavaScript'>JavaScript</Link>
                </div>

                <div className={questionType.box}>
                     <Link to='/React'>React JS</Link>
                </div>
            </div>

        </section >
    )
}
export default QuestionType;
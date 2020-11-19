import React from 'react';
import questionType from './questionType.module.css'

const QuestionType = () => {
    return (
        <section className={questionType.questionType}>
            <div className={questionType.container}>
                <div className={questionType.box_}>
                    <img src="https://png-assets.com/wp-content/uploads/impressive-js-logo-png-and-filejavascript-logo-wikimedia-commons.png" alt='' />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, consequatur! orem ipsum dolor, sit amet
                    consectetur adipisicing elit. Neque, consequatur!
            <button className={questionType.btn_}>Learn More</button>
                    </p>
                </div>
                <div className={questionType.box_}>
                    <img src="https://ru.reactjs.org/logo-og.png" alt='' />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste iusto hic reiciendis assumenda itaque, natus
                    dolore ullam ipsam atque iure aliquid explicabo necessitatibus nobis illo! Dignissimos nisi alias minima in.
            <button className={questionType.btn_}>Learn More</button>
                    </p>
                </div>

            </div>
        </section >
    )
}
export default QuestionType;
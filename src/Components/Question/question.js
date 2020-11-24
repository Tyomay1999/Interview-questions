import React, { useState } from 'react';
import questionModal from './question.module.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
const Question = () => {
    const [result, setResult] = useState(false)
    const  data = firebase.database();
    data.ref('JavaScript').push({
        quize1:{
            quize:'laves?',
            answers:{
                one:'harmar',
                two:'normal',
                three:'lav du?',
                four:'Merac'
            },
            trueAnswer:'lav du?'
        }
    });
    // const name = data.ref('anun')
    // name.on('value',(e)=>{console.log(e.val())})


    return (
        <div className={questionModal.question}>
            <div id={questionModal.modal_container} className={result ? `${questionModal.one} ${questionModal.out}` : `${questionModal.one}`}>
                <div className={questionModal.modal_background}>
                    <div className={questionModal.modal}>
                        <h2>Question XX</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <div className={questionModal.answers}>
                            <form>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown
                            </span>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown
                            </span>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown
                            </span>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown
                                </span>
                                </label>
                            </form>
                        </div>
                        {/* <button className="lastQuestion">Last question</button> */}
                        <button className={questionModal.confirmAnswer} onClick={() => { setResult(!result) }}>Confirm answer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;
import React, { useState } from 'react';
import { sendLanguage } from '../../functions';
import infoModalModule from './infoModal.module.css';



const InfoModal = ({ history }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [language, setLanguage] = useState(sessionStorage.language ? sessionStorage.language : 'EN');

    return (
        <>
            <div id={isOpen ? infoModalModule.modal : infoModalModule.modal1}>
                <div className={infoModalModule['modal-bg']}>
                    <div className={infoModalModule['modal-cont']}>
                        <div className={infoModalModule.language}>
                            <h2 className={infoModalModule.text}>
                                {(language === 'EN') ? "Choose your preferred language" : (language === 'RU') ? "Выберите желаемый язык" : "Ընտրեք ձեր նախընտրած լեզուն"}
                            </h2>

                            <div className={infoModalModule['control-group']}>
                                <div className={infoModalModule.select}>
                                    <select 
                                    defaultValue={(sessionStorage.language === 'EN') ? 'EN' : (sessionStorage.language === 'RU') ? 'RU' : 'HY'}
                                    onChange={(e) => {
                                        sessionStorage.setItem('language',e.target.value)
                                        setLanguage(e.target.value);
                                        sendLanguage(e.target.value);
                                    }}>
                                        <option>EN</option>
                                        <option>RU</option>
                                        <option>HY</option>
                                    </select>
                                    <div className={infoModalModule.select__arrow}></div>
                                </div>
                            </div>
                            <h2 className={infoModalModule.text}>
                                {(language === 'EN') ? "language can change from within" : (language === 'RU') ? "также язык может измениться изнутри" : "լեզուն կարող է նաև փոխվել ներսից"}
                            </h2>
                        </div>
                        <div>
                        <p className={infoModalModule.text}>
                                {
                                    (language === 'EN') ?
                                        "The site was translated as convenient for the user"
                                        :
                                        (language === 'RU') ?
                                            "Сайт был переведен максимально удобно для пользователя"
                                            :
                                            'Կայքը թարգմանվել է օգտվողի համար հնարավորինս հարմար ձևով'
                                }
                            </p>
                            <p className={infoModalModule.text}>
                                {(language === 'EN') ? "Warning!!" : (language === 'RU') ? "Предупреждение!!" : "Զգուշացում!!"}
                                <br />
                                {
                                    (language === 'EN') ?
                                        "During the test, the confirmed answer cannot be changed"
                                        :
                                        (language === 'RU') ?
                                            "Во время теста подтвержденный ответ изменить нельзя."
                                            :
                                            'Թեստի լուծման ընթացքում հաստատված պատասխանը փոփոխման ենթակա չէ'
                                }
                            </p>
                        </div>
                        <button
                            onClick={() => { setIsOpen(false); history.push('/questions') }}
                            className={`${infoModalModule.close} ${infoModalModule.close1}`}
                        >
                            {(language === 'EN') ? "Close" : (language === 'RU') ? "Закрыть" : "Փակել"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoModal;
import React, { useState, useEffect } from 'react';
import { sendLanguage } from '../../functions';
import infoModalModule from './infoModal.module.css';



const InfoModal = ({ history }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [language, setLanguage] = useState(sessionStorage.language ? sessionStorage.language : 'EN');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>

            <div id={isOpen ? infoModalModule.modal : infoModalModule.modal1}>
                <div class={infoModalModule['modal-bg']}>
                    <div class={infoModalModule['modal-cont']}>
                        <div className={infoModalModule.language}>
                            <h2 class={infoModalModule.text}>
                                {(language === 'EN') ? "Choose your preferred language" : (language === 'RU') ? "Выберите желаемый язык" : "Ընտրեք ձեր նախընտրած լեզուն"}
                            </h2>

                            <div className={infoModalModule['control-group']}>
                                <div className={infoModalModule.select}>
                                    <select onChange={(e) => {
                                        sessionStorage.setItem('language',e.target.value)
                                        setLanguage(e.target.value);
                                        sendLanguage(e.target.value);
                                    }}>
                                        <option selected={(sessionStorage.language === 'EN') ? 'selected' : ''}>EN</option>
                                        <option selected={(sessionStorage.language === 'RU') ? 'selected' : ''}>RU</option>
                                        <option selected={(sessionStorage.language === 'HY') ? 'selected' : ''}>HY</option>
                                    </select>
                                    <div className={infoModalModule.select__arrow}></div>
                                </div>
                            </div>
                            <h2 class={infoModalModule.text}>
                                {(language === 'EN') ? "language can change from within" : (language === 'RU') ? "также язык может измениться изнутри" : "լեզուն կարող է նաև փոխվել ներսից"}
                            </h2>
                        </div>
                        <div>
                            <p class={infoModalModule.text}>
                                {(language === 'EN') ? "Warning!!" : (language === 'RU') ? "Предупреждение!!" : "Զգուշացում!!"}
                                <br />
                                {
                                    (language === 'EN') ?
                                        "During the test, the confirmed answer cannot be changed"
                                        :
                                        (language === 'RU') ?
                                            "Во время теста подтвержденный ответ изменить нельзя."
                                            :
                                            'Թեստի լուծման ընթացքում հաստատված պատասխանը հնարավոր չէ փոխել'
                                }
                            </p>
                        </div>
                        <a
                            onClick={() => { setIsOpen(false); history.push('/questions') }}
                            class={`${infoModalModule.close} ${infoModalModule.close1}`}
                        >
                            {(language === 'EN') ? "Close" : (language === 'RU') ? "Закрыть" : "Փակել"}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoModal;
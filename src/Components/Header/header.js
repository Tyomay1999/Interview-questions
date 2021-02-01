import React, { useState } from 'react';
import headerModule from './header.module.css';
import { withRouter } from 'react-router-dom';
import { logOut } from '../../functions';


const Header = (props) => {
    let { setLanguage, history } = props;
    const [firstName] = useState(sessionStorage.firstName ? sessionStorage.getItem('firstName') : '');
    const [lastName] = useState(sessionStorage.lastName ? sessionStorage.getItem('lastName') : '');
    const language = sessionStorage.language
    return (
        <section className={headerModule.navBar}>
            <nav className={headerModule.nav}>
                <div className={headerModule.lastQuestion}>
                    <button
                        className={headerModule.headerButton}
                        onClick={() => {
                            history.push('/PreviousQuestion')
                        }}
                    >
                        {(language === 'EN') ? "Previous questions" : (language === 'RU') ? "Предыдущие вопросы" : "Նախորդ հարցերը"}
                    </button>
                </div>
                <div className={headerModule.userInfo}>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                    {
                        setLanguage ?
                            <div className={headerModule['ontrol-group']}>
                                <div className={headerModule.select}>
                                    <select
                                        defaultValue={(sessionStorage.language === 'EN') ? 'EN' : (sessionStorage.language === 'RU') ? 'RU' : 'HY'}
                                        onChange={(e) => {
                                            sessionStorage.setItem('language', e.target.value);
                                            setLanguage(e.target.value);
                                        }}>
                                        <option>EN</option>
                                        <option>RU</option>
                                        <option>HY</option>
                                    </select>
                                    <div className={headerModule.select__arrow}></div>
                                </div>
                            </div>
                            : ''}
                </div>
                <div>
                    <button
                        className={headerModule.headerButton}
                        onClick={() => {
                            logOut(history);
                        }}
                    >
                        {(language === 'EN') ? "Log out" : (language === 'RU') ? "Выйти" : "Դուրս գալ"}
                    </button>
                </div>
            </nav>
        </section>
    )
}

export default withRouter(Header);
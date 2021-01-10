import React, { useState } from 'react';
import headerModule from './header.module.css'

const Header = ({ history }) => {
    const [firstName] = useState(sessionStorage.firstName ? sessionStorage.getItem('firstName') : '');
    const [lastName] = useState(sessionStorage.lastName ? sessionStorage.getItem('lastName') : '')

    return (
        <section className={headerModule.navBar}>
            <nav className={headerModule.nav}>
                <div className={headerModule.lastQuestion}>
                    <button 
                        className={headerModule.lastQuestionButton}
                        onClick={() => {
                            history.push('/PreviousQuestion')
                        }}
                    >
                        Previous question
                   </button>
                </div>
                <div className={headerModule.userInfo}>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
                <div>
                    <button
                        onClick={() => {
                            sessionStorage.clear();
                            localStorage.clear();
                            history.push('/')
                        }}
                    >Log out
                   </button>
                </div>
            </nav>
        </section>
    )
}

export default Header;
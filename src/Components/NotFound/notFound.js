import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import notFoundModule from './notFound.module.css'

const NotFound = () => {
    const [language] = useState(sessionStorage.language ? sessionStorage.language : 'EN');

    return (
        <div className={notFoundModule.notFound}>
            <h1 className={notFoundModule.number}>404</h1>
            <p className={notFoundModule.notFoundText}>
                {(language === 'EN') ? "Oops! Something is wrong." : (language === 'RU') ? "Ой! Что-то не так." : "Ինչ - որ բան սխալ է."}
            </p>
            {
                sessionStorage.getItem("lastName") ?
                    <Link className={notFoundModule.button} to="/questions">
                        {(language === 'EN') ? "Go back" : (language === 'RU') ? "Назад" : "Վերադառնալ"}
                    </Link>
                    :
                    <Link className={notFoundModule.button} to="/">
                        {(language === 'EN') ? "Go back" : (language === 'RU') ? "Назад" : "Վերադառնալ"}
                    </Link>
            }
        </div>
    )
}

export default NotFound;
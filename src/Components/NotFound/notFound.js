import React from 'react';
import { Link } from 'react-router-dom';
import notFoundModule from './notFound.module.css'

const NotFound = () => {
    return (
        <div className={notFoundModule.notFound}>
            <h1 className={notFoundModule.number}>404</h1>
            <p className={notFoundModule.notFoundText}>Oops! Something is wrong.</p>
            <Link className={notFoundModule.button} to="/login"> Go back</Link>
        </div>
    )
}

export default NotFound;
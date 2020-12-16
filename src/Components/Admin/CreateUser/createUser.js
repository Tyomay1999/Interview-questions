import React, { useState, useEffect } from 'react';
import createUserModule from './createUser.module.css';
import firebase from 'firebase/app'; 
import 'firebase/database'; 
import 'firebase/auth';
const CreateUser = (props) => {
    const [state, setState] = useState('');
// firebase.database().ref('Users').push({
//     totalUsers: 1
// })
    return (
        <section className={createUserModule.general}>
            ReactJS Starter Template by Varun Bardwaj
        </section>
    )
}

export default CreateUser;
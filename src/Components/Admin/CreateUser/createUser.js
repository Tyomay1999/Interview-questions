import React, { useState, useEffect } from 'react';
import createUserModule from './createUser.module.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
const CreateUser = ({ setNewUsers, users, setUsers }) => {
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Errore, setErrore] = useState('');
    const [totalUsers, changeTotalUsers] = useState(null);
    const [userDeleter, setUserDeleter] = useState([]);
    useEffect(() => {
        if (users.user) {
            setFirstName(users.user.firstName);
            setLastName(users.user.lastName);
            setEmail(users.user.email);
            setPassword(users.password);
            setIsAdmin(users.user.isAdmin)
        }
        firebase.database().ref('Users').on("value", question => {
            let dataList = [];
            question.forEach(item => {
                dataList.push(item.val());
            });
            setUserDeleter(dataList)
            changeTotalUsers(dataList[0].totalUsers)
        })
    }, [loading])
    const CreateUser = () => {
        if (email && password && lastName && firstName) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            firebase.database().ref(`Users/${totalUsers + 1}`).update({
                isAdmin,
                id: (totalUsers + 1),
                firstName,
                lastName,
                email,
                password
            })
            firebase.database().ref(`Users/0`).update({
                totalUsers: totalUsers + 1
            })
            setLastName('');
            setFirstName('');
            setEmail('');
            setPassword('');
            setErrore('');
            setLoading(!loading);
            setUsers(true);
            setNewUsers(false);
        } else {
            setErrore('Please write all lines')
        }
    }
    const editeUser = () => {
        firebase.database().ref(`Users/${users.user.id}`).update({
            isAdmin,
            id: users.user.id,
            firstName,
            lastName,
            email
        })
        setLastName('');
        setFirstName('');
        setEmail('');
        setPassword('');
        setIsAdmin(false)
        setLoading(!loading);
        setUsers(true)
        setNewUsers(false)
    }
    const deleteUser = () => {
        userDeleter[0].totalUsers -= 1;
        const falseArray = [];
        userDeleter.forEach((item, index) => {
            if (item.email === email) {
                falseArray.push(userDeleter[0])
                for (let i = 1; i < index; i++) {
                    userDeleter[i].id = i;
                    falseArray.push(userDeleter[i])
                }
                for (let i = index; i < userDeleter.length; i++) {
                    if (userDeleter[i + 1]) {
                        userDeleter[i + 1].id = i;
                        userDeleter[i] = userDeleter[i + 1];
                        falseArray.push(userDeleter[i]);
                    }
                }
            } else {
                setErrore('dont have a this user')
            }
        })
        firebase.database().ref(`Users/${(userDeleter[0].totalUsers + 1)}`).remove();
        firebase.database().ref('Users').update(falseArray);
        setLastName('');
        setFirstName('');
        setEmail('');
        setPassword('');
        setErrore('');
        setLoading(!loading);
        setUsers(true);
        setNewUsers(false);
    }
    return (
        <section className={createUserModule.modal}>
            <div className={createUserModule.panel}>
                {Errore ? <p>{Errore}</p> : ''}
                <p className={createUserModule.questionInput} >{isAdmin ? 'Admin' : 'User'}</p>
                <input
                    type="submit"
                    value='change'
                    onClick={() => { setIsAdmin(!isAdmin) }}
                    className={createUserModule.questionAnswer}
                />
                <input
                    type="text"
                    placeholder='FirstName'
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                    className={createUserModule.questionAnswer
                    } />
                <input
                    disabled={firstName ? false : true}
                    type="text"
                    value={lastName}
                    placeholder='LastName'
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                    className={createUserModule.questionAnswer
                    } />
                <input
                    disabled={lastName ? false : true}
                    type="email"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => {
                        setEmail(e.target.value)

                    }}
                    className={createUserModule.questionAnswer}
                />
                <input
                    disabled={email ? false : true}
                    type="text"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => {
                        setPassword(e.target.value)

                    }}
                    className={createUserModule.questionAnswer}
                />
                <div className={createUserModule.buttons}>
                    <button
                        disabled={email ? false : true}
                        onClick={() => {
                            setLoading(!loading)
                            setErrore('');
                            CreateUser();
                        }}
                        className={createUserModule.button}
                    >Create</button>
                    <button
                        disabled={email ? false : true}

                        onClick={() => {
                            setErrore('');
                            editeUser();
                        }}
                        className={createUserModule.button}
                    >Edite</button>
                    <button
                        disabled={email ? false : true}
                        onClick={() => {
                            setErrore('');
                            deleteUser()
                        }}
                        className={createUserModule.button}
                    >Delete</button>
                </div>
            </div>
        </section>
    )
}

export default CreateUser;
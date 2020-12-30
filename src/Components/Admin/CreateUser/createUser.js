import React, { useState, useEffect } from 'react';
import createUserModule from './createUser.module.css';
import { UserCreate, editeUser, deleteUser, Reg, firebaseDatabase } from '../../../functions';

const CreateUser = ({ setNewUsers, users, setUsers }) => {
    const { user } = users;
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(user ? user.isAdmin : false);
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState(user ? user.password : '');
    const [Errore, setErrore] = useState('');
    const [totalUsers, changeTotalUsers] = useState(null);
    const [userDeleter, setUserDeleter] = useState([]);


    useEffect(() => {
        firebaseDatabase().ref('Users').on("value", question => {
            let dataList = [];
            question.forEach(item => {
                dataList.push(item.val());
            });
            setUserDeleter(dataList)
            if (dataList[0]) {
                changeTotalUsers(dataList[0].totalUsers)
            }
        })
    }, [loading])

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
                        setEmail(e.target.value.toLocaleLowerCase())
                    }}
                    className={createUserModule.questionAnswer}
                />
                <input
                    disabled={email ? false : true}
                    type="Password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className={createUserModule.questionAnswer}
                />
                <div className={createUserModule.buttons}>
                    <button
                        disabled={user ? true : (password ? false : true)}
                        onClick={() => {
                            if (Reg.emailReg.test(email) && Reg.passwordReg.test(password)) {
                                setLoading(!loading)
                                setErrore('');
                                UserCreate({
                                    email,
                                    password,
                                    lastName,
                                    firstName,
                                    totalUsers,
                                    isAdmin,
                                    setLastName,
                                    setFirstName,
                                    setEmail,
                                    setPassword,
                                    setErrore,
                                    setLoading,
                                    loading,
                                    setUsers,
                                    setNewUsers
                                });
                            } else {
                                setErrore('Please check password or email addres')
                            }
                        }}
                        className={createUserModule.button}
                    >Create</button>
                    <button
                        disabled={user ? false : true}

                        onClick={() => {
                            if (Reg.emailReg.test(email) && Reg.passwordReg.test(password)) {
                                setErrore('');
                                editeUser({
                                    users,
                                    isAdmin,
                                    firstName,
                                    lastName,
                                    email,
                                    setLastName,
                                    setFirstName,
                                    setEmail,
                                    setPassword,
                                    setIsAdmin,
                                    setLoading,
                                    loading,
                                    setUsers,
                                    setNewUsers
                                });
                            } else {
                                setErrore('Please check password or email addres')
                            }
                        }}
                        className={createUserModule.button}
                    >Edite</button>
                    <button
                        disabled={user ? false : true}
                        onClick={() => {
                            setErrore('');
                            deleteUser({
                                userDeleter,
                                setErrore,
                                setLastName,
                                setFirstName,
                                setEmail,
                                setPassword,
                                setLoading,
                                loading,
                                setUsers,
                                setNewUsers,
                                email
                            })
                        }}
                        className={createUserModule.button}
                    >Delete</button>
                </div>
            </div>
        </section>
    )
}

export default CreateUser;
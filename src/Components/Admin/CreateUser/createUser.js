import React, { useState, useEffect } from 'react';
import createUserModule from './createUser.module.css';
import { UserCreate, editeUser, deleteUser, Reg, firebaseDatabase } from '../../../functions';

const CreateUser = ({ setNewUsers, users, setUsers,languages }) => {
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
    const [language, getLanguage] = useState(languages);

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
            getLanguage(languages)
        })
    }, [loading,languages])

    return (
        <section className={createUserModule.modal}>
            <div className={createUserModule.panel}>
                {Errore ? <p className={createUserModule.errore}>{Errore}</p> : ''}
                <p className={createUserModule.questionInput} >
                {isAdmin ?
                    ((language === 0) ? "Admin" : (language === 1) ? "Админ" : "Ադմին.")
                    : ((language === 0) ? "User" : (language === 1) ? "Пользователь" : "Օգտվող")
                    }
                </p>
                <div className={createUserModule.inputs}>
                <button
                    onClick={() => { setIsAdmin(!isAdmin) }}
                >
                    {(language === 0) ? "Change position" : (language === 1) ? "Изменить позицию" : "Փոխել դիրքը"}
                </button>
                <input
                    type="text"
                    placeholder={(language === 0) ? "First Name" : (language === 1) ? "Имя" : "Անուն"}
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
                    placeholder={(language === 0) ? "Last Name" : (language === 1) ? "Фамилия" : "Ազգանուն"}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                    className={createUserModule.questionAnswer
                    } />
                <input
                    disabled={lastName ? false : true}
                    type="email"
                    value={email}
                    placeholder={(language === 0) ? "Email" : (language === 1) ? "Эл. адрес" : "Էլ.հասցե"}
                    onChange={(e) => {
                        setEmail(e.target.value.toLocaleLowerCase())
                    }}
                    className={createUserModule.questionAnswer}
                />
                <input
                    disabled={email ? false : true}
                    type="Password"
                    value={password}
                    placeholder={(language === 0) ? "Password" : (language === 1) ? "Пароль" : "Գաղտնաբառ"}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className={createUserModule.questionAnswer}
                />
                </div>
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
                                setErrore((language === 0) ? "Please check password or email addres" 
                                : (language === 1) ? "Пожалуйста, проверьте пароль или адрес электронной почты" 
                                : "Խնդրում ենք ստուգել գաղտնաբառը կամ էլ. Փոստի հասցեն")
                            }
                        }}
                        className={createUserModule.button}
                    >
                        {(language === 0) ? "Add" : (language === 1) ? "Добавить" : "Ավելացնել"}
                        </button>
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
                                
                                setErrore((language === 0) ? "Please check password or email addres" 
                                : (language === 1) ? "Пожалуйста, проверьте пароль или адрес электронной почты" 
                                : "Խնդրում ենք ստուգել գաղտնաբառը կամ էլ. Փոստի հասցեն")
                            }
                        }}
                        className={createUserModule.button}
                    >
                        {(language === 0) ? "Save the change" : (language === 1) ? "Сохраните изменение" : "Պահպանել փոփոխությունը"}
                        </button>
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
                    >
                        {(language === 0) ? "Delete" : (language === 1) ? "Удалить" : "Ջնջել"}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CreateUser;
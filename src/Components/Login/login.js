import React, { useEffect, useState } from 'react';
import loginModule from './login.module.css';
import './button.css';
import { Reg, createAcaunte, chackUser, firebaseDatabase } from '../../functions';
const Login = ({ history }) => {
    const [isActive, changeActive] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [totalUsers, changeTotalUsers] = useState(null);
    const [checked, isChecked] = useState(false);
    const [language, setLanguage] = useState('EN');

    useEffect(() => {
        if (localStorage.getItem('email')) {
            const localEmail = localStorage.getItem('email'),
                localPassword = localStorage.getItem('password');
            chackUser({
                email: localEmail,
                password: localPassword,
                setLoading,
                setLoginErrorMessage,
                history,
                checked
            });
        }
        firebaseDatabase().ref('Users').on("value", question => {
            let dataList = [];
            question.forEach(item => {
                dataList.push(item.val());
            });
            changeTotalUsers(dataList[0].totalUsers)
        })
    }, [isActive, checked, history])

    const checkPassword = () => {
        if (password !== '') {
            if (password === conPassword) {
                setRegisterErrorMessage('')
                createAcaunte({
                    totalUsers,
                    firstName,
                    lastName,
                    email,
                    password,
                    setLoading,
                    changeActive,
                    isActive,
                    setRegisterErrorMessage
                })
            } else {
                setLoading(false)
                setRegisterErrorMessage('passwords did not match')
            }
        } else {
            setLoading(false)
            setRegisterErrorMessage('Password is none')
        }
    }

    return (
        <>
            <header className={loginModule.Lang}>
                <div className={loginModule['control-group']}>
                    <div className={loginModule.select}>
                        <select
                            defaultValue={(sessionStorage.language === 'EN') ? 'EN' : (sessionStorage.language === 'RU') ? 'RU' : 'HY'}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                sessionStorage.setItem('language', e.target.value)
                            }}>
                            <option>EN</option>
                            <option>RU</option>
                            <option>HY</option>
                        </select>
                        <div className={loginModule.select__arrow}></div>
                    </div>
                </div>
            </header>
            <div className={loginModule.login}>
                <div
                    className={`${isActive ?
                        `${loginModule.container} ${loginModule['right-panel-active']}`
                        : `${loginModule.container}`}`}
                    id={loginModule.container}
                >
                    <div className={`${loginModule['form-container']} ${loginModule['sign-up-container']}`}>
                        <div className={loginModule.form}>
                            <h1>{(language === 'EN') ? "Register" : (language === 'RU') ? "Регистрация" : "Գրանցվել"}</h1>
                            <input
                                type="text"
                                placeholder={(language === 'EN') ? "FirstName" : (language === 'RU') ? "Имя" : "Անուն"}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                            <input
                                disabled={firstName ? false : true}
                                type="text"
                                placeholder={(language === 'EN') ? "LastName" : (language === 'RU') ? "Фамилия" : "Ազգանուն"}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                            <input
                                disabled={lastName ? false : true}
                                type="email"
                                placeholder={(language === 'EN') ? "Email" : (language === 'RU') ? "Почта" : "էլ. Հասցե"}
                                onChange={(e) => {
                                    if (Reg.emailReg.test(e.target.value.toLocaleLowerCase())) {
                                        setEmail(e.target.value.toLocaleLowerCase())
                                    }
                                }}
                            />
                            <input
                                disabled={email ? false : true}
                                type='password'
                                placeholder={(language === 'EN') ? "Password" : (language === 'RU') ? "Пароль" : "Գաղնաբառ"}
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        setPassword(e.target.value)
                                    }
                                }}
                            />
                            <input
                                disabled={password ? false : true}
                                type='password'
                                placeholder={(language === 'EN') ? "Confirm Password" : (language === 'RU') ? "Повторите Пароль" : "Կրկնել Գաղնաբառ"}
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        setConPassword(e.target.value)
                                    }
                                }}
                            />
                            <p className={loginModule.errore}>{registerErrorMessage}</p>
                            <button
                                disabled={conPassword ? false : true}
                                className={loading ? `btn is-active` : `btn`}
                                onClick={() => {
                                    setLoading(!loading);
                                    checkPassword()
                                }}>
                                {(language === 'EN') ? "Confirm Register" : (language === 'RU') ? "Регистрация" : "Գրանցվել"}
                            </button>
                        </div>
                    </div>
                    <div className={`${loginModule['form-container']} ${loginModule['sign-in-container']}`}>
                        <div className={loginModule.form}>
                            <h1>{(language === 'EN') ? "Login" : (language === 'RU') ? "Авторизоваться" : "Մուտք"}</h1>
                            <input
                                type='email'
                                placeholder={(language === 'EN') ? "Email" : (language === 'RU') ? "Почта" : "էլ. Հասցե"}
                                onChange={(e) => {
                                    if (Reg.emailReg.test(e.target.value.toLocaleLowerCase())) {
                                        setEmail(e.target.value.toLocaleLowerCase())
                                    }
                                }}
                            />
                            <input
                                type='password'
                                disabled={email ? false : true}
                                placeholder={(language === 'EN') ? "Password" : (language === 'RU') ? "Пароль" : "Գաղնաբառ"}
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        setPassword(e.target.value)
                                    }
                                }}
                            />
                            <form className={loginModule.rememberMe} onClick={() => { isChecked(!checked) }}>
                                <input
                                    type='checkbox'
                                    onChange={() => {
                                        isChecked(!checked)
                                    }}
                                />

                                <h5>{(language === 'EN') ? "Remember me?" : (language === 'RU') ? "Запомнить меня?" : "Հիշե՞լ ինձ"}</h5>
                            </form>
                            <p className={loginModule.errore}>{loginErrorMessage}</p>
                            <button
                                disabled={(email && password) ? false : true}
                                className={loading ? `btn is-active` : `btn`}
                                onClick={() => {
                                    if (password && email) {
                                        setLoading(!loading);
                                        chackUser({
                                            email,
                                            password,
                                            setLoading,
                                            setLoginErrorMessage,
                                            history,
                                            checked
                                        });
                                    } else {
                                        setLoginErrorMessage('Check your username or password or register');
                                    }
                                }}
                            >
                                {(language === 'EN') ? "Login" : (language === 'RU') ? "Авторизоваться" : "Մուտք"}
                            </button>
                        </div>
                    </div>
                    <div className={loginModule['overlay-container']}>

                        <div className={loginModule.overlay}>
                            <div className={loginModule['bg-bubbles']}>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </div>

                            <div className={`${loginModule['overlay-panel']} ${loginModule['overlay-left']}`}>
                                <p>
                                    {(language === 'EN') ? "To register, enter your personal data and sign in to the system" : (language === 'RU') ? "Для регистрации вводите свои личные данные и осуществите входите в систему" : "Գրանցվելու համար մուտքագրեք ձեր անձնական տվյալները և մուտք գործեք համակարգ"}
                                </p>
                                <button
                                    className='ghost'
                                    id='signIn'
                                    onClick={() => {
                                        if (loading) {
                                            setLoading(false)
                                            changeActive(!isActive)
                                        } else {
                                            changeActive(!isActive)
                                        }
                                    }}
                                >
                                    {(language === 'EN') ? "Sign in" : (language === 'RU') ? "Войти в систему" : "Մուտք գործել"}
                                </button>
                            </div>
                            <div className={`${loginModule['overlay-panel']} ${loginModule['overlay-right']}`}>
                                <h1>
                                    {(language === 'EN') ? "Hello, Friend!" : (language === 'RU') ? "Привет!" : "Ողջույն!"}
                                </h1>
                                <p>
                                    {(language === 'EN') ? "Enter your personal details and start testing your skills with us" : (language === 'RU') ? "Введите свои личные данные и начните проверять свои навыки в месте с нами" : "Մուտքագրեք ձեր անձնական տվյալները և սկսեք ստուգել ձեր հմտությունները մեզ հետ"}
                                </p>

                                <button
                                    className="ghost"
                                    id="signUp"
                                    onClick={() => {
                                        if (loading) {
                                            setLoading(false)
                                            changeActive(!isActive)
                                        } else {
                                            changeActive(!isActive)
                                        }
                                    }}
                                >
                                    {(language === 'EN') ? "Register" : (language === 'RU') ? "Регистрация" : "Գրանցվել"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login;


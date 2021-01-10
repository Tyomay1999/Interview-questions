import React, { useEffect, useState } from 'react';
import './login.css';
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
    
    useEffect(() => {
        if(localStorage.getItem('email')){
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
    }, [isActive])

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
            <div className='login'>
                <div className={`${isActive ? 'container right-panel-active' : 'container'}`} id='container'>
                    <div className="form-container sign-up-container">
                        <div className='form'>
                            <h1>Register</h1>
                            <input
                                type="text"
                                placeholder="FirstName"
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                            <input
                                disabled={firstName ? false : true}
                                type="text"
                                placeholder="LastName"
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                            <input
                                disabled={lastName ? false : true}
                                type="email"
                                placeholder="Email"
                                onChange={(e) => {
                                    if (Reg.emailReg.test(e.target.value.toLocaleLowerCase())) {
                                        setEmail(e.target.value.toLocaleLowerCase())
                                    }
                                }}
                            />
                            <input
                                disabled={email ? false : true}
                                type='password'
                                placeholder="Password"
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        setPassword(e.target.value)
                                    }
                                }}
                            />
                            <input
                                disabled={password ? false : true}
                                placeholder="Confirm Password"
                                type='password'
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        setConPassword(e.target.value)
                                    }
                                }}
                            />
                            <p className='errore'>{registerErrorMessage}</p>
                            <button
                                disabled={conPassword ? false : true}
                                className={loading ? 'btn is-active' : 'btn'}
                                onClick={() => {
                                    setLoading(!loading);
                                    checkPassword()
                                }}>
                                Register</button>
                        </div>
                    </div>
                    <div className="form-container sign-in-container">
                        <div className='form'>
                            <h1>Login</h1>
                            <input
                                placeholder="Email"
                                type='email'
                                onChange={(e) => {
                                    if (Reg.emailReg.test(e.target.value.toLocaleLowerCase())) {
                                        setEmail(e.target.value.toLocaleLowerCase())
                                    }
                                }}
                            />
                            <input
                                disabled={email ? false : true}
                                placeholder="Password"
                                type='password'
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        setPassword(e.target.value)
                                    }
                                }}
                            />
                            <form className='rememberMe'>
                                <input 
                                    type='checkbox'
                                    onChange={() => {
                                        isChecked(!checked)
                                    }}
                                />
                                <h5>Remember me?</h5>
                            </form>
                            <p className='errore'>{loginErrorMessage}</p>
                            <button
                                disabled={(email && password) ? false : true}
                                className={loading ? 'btn is-active' : 'btn'}
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
                            >Login</button>
                        </div>
                    </div>
                    <div className="overlay-container">

                        <div className="overlay">
                            <div className="bg-bubbles">
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

                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button
                                    className="ghost"
                                    id="signIn"
                                    onClick={() => {
                                        if (loading) {
                                            setLoading(false)
                                            changeActive(!isActive)
                                        } else {
                                            changeActive(!isActive)
                                        }
                                    }}
                                >Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
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
                                >Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login;

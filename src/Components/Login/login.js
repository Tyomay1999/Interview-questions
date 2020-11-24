import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import './login.css';
import './button.css'


const Login = ({ history }) => {

    let Reg = {
        emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        passwordReg: /^[a-z0-9_$-]{7,30}$/i
    }
    const [isActive, changeActive] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [loading,setLoading] = useState(false)

    let loginAndPassword = {
        password: '',
        conPassword: '',
        email: ''
    };
    const createAcaunte = () => {
        const { email, password } = loginAndPassword;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(resp => {
                let isSineIn = resp.operationType
                if (isSineIn === 'signIn') {
                    setLoading(false)
                    changeActive(!isActive)
                }
            })
            .catch(errore => {
                setRegisterErrorMessage(`${errore.message}`)
            })
    }
    const checkPassword = () => {
        if (loginAndPassword.password !== '') {
            if (loginAndPassword.password === loginAndPassword.conPassword) {
                setRegisterErrorMessage('')
                createAcaunte()
            } else {
                setLoading(false)
                setRegisterErrorMessage('passwords did not match')
            }
        }else{
            setLoading(false)
            setRegisterErrorMessage('Password is none')
        }
    }
    const chackUser = () => {
        const { email, password } = loginAndPassword;

        if (email && password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(resp => {
                    let isSineIn = resp.operationType
                    if (isSineIn === 'signIn') {
                        history.push('/')
                    }
                })
                .catch(error => {
                    setLoading(false)
                    setLoginErrorMessage(`${error.message}`)
                })
        } else {
            setLoading(false)
            setLoginErrorMessage('Email or password is none')
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
                                type="email"
                                placeholder="Email"
                                onChange={(e) => {
                                    if (Reg.emailReg.test(e.target.value.toLocaleLowerCase())) {
                                        loginAndPassword.email = e.target.value.toLocaleLowerCase()
                                    }
                                }}
                            />
                            <input
                                type='password'
                                placeholder="Password"
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        loginAndPassword.password = e.target.value
                                    }
                                }}
                            />
                            <input
                                placeholder="Confirm Password"
                                type='password'
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        loginAndPassword.conPassword = e.target.value
                                    }
                                }}
                            />
                            <p>{registerErrorMessage}</p>
                            <button className={loading ? 'btn is-active' : 'btn'} onClick={() => { setLoading(!loading);checkPassword() }}>Register</button>
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
                                        loginAndPassword.email = e.target.value.toLocaleLowerCase()
                                    }
                                }}
                            />
                            <input
                                placeholder="Password"
                                type='password'
                                onChange={(e) => {
                                    if (Reg.passwordReg.test(e.target.value)) {
                                        loginAndPassword.password = e.target.value
                                    }
                                }}
                            />
                            <p>{loginErrorMessage}</p>
                            <button className={loading ? 'btn is-active' : 'btn'} onClick={() => { setLoading(!loading);chackUser() }}>Login</button>
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
                                        if(loading){
                                            setLoading(false)
                                            changeActive(!isActive) 
                                        }else{
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
                                        if(loading){
                                            setLoading(false)
                                            changeActive(!isActive) 
                                        }else{
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

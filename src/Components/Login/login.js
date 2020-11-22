import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import './login.css';


const Login = ({ history }) => {
    
    let Reg ={ 
        emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        passwordReg: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
    }
    const [isActive, changeActive] = useState(false);
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
                    changeActive(!isActive)
                }
            })
            .catch(errore => {
            console.log("🚀 ~ file: login.js ~ line 22 ~ createAcaunte ~ errore", errore)
            })
    }
    const checkPassword = () => {
        if (loginAndPassword.password === loginAndPassword.conPassword && loginAndPassword.password !== '' ) {
            createAcaunte()
        } else {
            alert('passwords did not match')
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
                    console.log("isLogin -> error", error)
                })
        } else {
            console.log('write')
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
                                    if(Reg.emailReg.test(e.target.value.toLocaleLowerCase())){
                                        loginAndPassword.email = e.target.value.toLocaleLowerCase()
                                    }
                                 }}
                            />
                            <input
                                type='password'
                                placeholder="Password"
                                onChange={(e) => { 
                                    if(Reg.passwordReg.test(e.target.value)){
                                        loginAndPassword.email = e.target.value
                                    }
                                 }}
                            />
                            <input
                                placeholder="Confirm Password"
                                type='password'
                                onChange={(e) => { 
                                    if(Reg.passwordReg.test(e.target.value)){
                                        loginAndPassword.email = e.target.value
                                    }
                                 }}
                            />
                            <p>Arra</p>

                            <button onClick={() => { checkPassword() }}>Register</button>
                        </div>

                    </div>
                    <div className="form-container sign-in-container">
                        <div className='form'>
                            <h1>Login</h1>
                            <input
                                placeholder="Email"
                                type='email'
                                onChange={(e) => { 
                                    if(Reg.emailReg.test(e.target.value.toLocaleLowerCase())){
                                        loginAndPassword.email = e.target.value.toLocaleLowerCase()
                                    }
                                 }}
                            />
                            <input
                                placeholder="Password"
                                type='password'
                                onChange={(e) => { 
                                    if(Reg.passwordReg.test(e.target.value)){
                                        loginAndPassword.email = e.target.value
                                    }
                                 }}
                            />
                            <p>Arra</p>
                            <button onClick={() => { chackUser() }}>Login</button>
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
                                    onClick={() => { changeActive(!isActive) }}
                                >Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button
                                    className="ghost"
                                    id="signUp"
                                    onClick={() => { changeActive(!isActive) }}
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
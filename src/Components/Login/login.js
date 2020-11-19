import React, { useState } from 'react';
import './login.css';

// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classNameList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classNameList.remove("right-panel-active");
// });

// const buttons = document.querySelectorAll('.form-container button')

const Login = () => {
    const [isActive,changeActive] = useState(false);
    return (
        <>
            <div className='login'>
                <div className={`${isActive ? 'container right-panel-active' : 'container'}`} id='container'>
                    <div className="form-container sign-up-container">
                        <form action="#ssssssssss<-----history  push for logine">
                            <h1>Register</h1>
                            <input placeholder="Username" />
                            <input placeholder="Password" />
                            <p>Forgot your password?</p>
                            <button onClick={() => {console.log('registere')}}>Register</button>
                        </form>

                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#eeeeeee<-----history  push for logine">
                            <h1>Login</h1>
                            <input placeholder="Username" />
                            <input placeholder="Password" />
                            <p>Forgot your password?</p>
                            <button onClick={() => {console.log('Login')}}>Login</button>
                        </form>
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
                                <button className="ghost" id="signIn" onClick={() => {changeActive(!isActive)}} >Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={() => {changeActive(!isActive)}} >Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;
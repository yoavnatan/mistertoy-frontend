import { Navigate, useNavigate } from 'react-router-dom'
import { LoginForm } from '../cmps/LoginForm.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'

import { useState } from 'react'

export function LoginSignup() {


    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            showSuccessMsg('Logged in successfully')
            navigate('/toy')

        } catch (err) {
            console.log(err)
            showErrorMsg('Oops try again')
        }
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => {
                showSuccessMsg('Signed in successfully')
                navigate('/toy')

            })
            .catch((err) => {
                console.log(err)
                showErrorMsg('Oops try again')
            })
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}

import React from "react";
import { useState } from 'react';

const Register = ({ }) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            alert("Please add an email")
            return
        }
        if (!username) {
            alert("Please add a username")
            return
        }
        if (!password) {
            alert("Please add a password")
            return
        }

        registerUser({ email, username, password })

        // after submitting register form make the fields blank
        setEmail('')
        setUsername('')
        setPassword('')
    }

    const registerUser = ({ email, username, password }) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                username: username,
                password, password
            })
        };

        fetch('/api/registeruser', requestOptions).then((response) => {
            console.log(response)
        })
    }


    return (
        <form onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type='text' placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Username</label>
                <input type='text' placeholder='Username' 
                value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Password</label>
                <input type='text' placeholder='Password' value={password}  
                onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <input type='submit' value='Register' className="btn btn-block"/>
        </form>
    )
}

export default Register
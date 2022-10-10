import React from "react";
import { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            alert("Please add an email")
            return
        }
        if (!password) {
            alert("Please add a password")
            return
        }

        loginUser({ email, password })

        // after submitting register form make the fields blank
        setEmail('')
        setPassword('')
    }

    const loginUser = ({ email, password }) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password, password
            })
        };

        fetch('/api/loginuser', requestOptions).then((response) => {
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
            <div className='form-control form-control-check'>
                <label>Password</label>
                <input type='text' placeholder='Password' value={password}  
                onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <input type='submit' value='Login' className="btn btn-block"/>
        </form>
    )
}

export default Login
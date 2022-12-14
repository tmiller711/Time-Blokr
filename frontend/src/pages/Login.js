import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import "../static/css/registration.css"

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

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

        fetch('/api/account/loginaccount', requestOptions).then((response) => {
            if(response.ok){
                navigate("/", {replace: true})
            } else {
                alert("Invalid Credentials")
            }
        })
    }


    return (
        <div className="login-form">
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <p>Want to register an account instead? Click <Link to="/register">Here</Link></p>
                <Button type='submit' className="btn btn-block">Login</Button>
            </Form>
        </div>
    )
}

export default Login
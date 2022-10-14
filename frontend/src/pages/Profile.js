import React from "react"
import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/profile.css"

const Profile = ({ getCookie }) => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [validated, setValidated] = useState('')

    useEffect(() => {
        const getAccountProfile = async () => {
            const accountsProfile = await fetchAccountProfile()
            // update the profile variables
            setName(accountsProfile.name)
            setPhoneNumber(accountsProfile.phone)
        }

        getAccountProfile()
    }, [])

    const fetchAccountProfile = async () => {
        const res = await fetch('/api/account/profile')
        const data = await res.json()

        return data
    }
    
    const onSubmit = async (e) => {
        e.preventDefault()
        const csrftoken = getCookie('csrftoken')

        const res = await fetch('/api/account/profile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                name: name,
                phone: phoneNumber
            })
        })

        const data = await res.json()

        setValidated(true)
        setTimeout(() => {
            setValidated(false)
        }, 2200)

    }

    const test = () => {
        console.log("blue")
    }

    return (
        <div className="profile-form">
            <Form validated={validated} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        onBlur={() => test()}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // onBlur={console.log("blur")}
                    />
                    <Form.Control.Feedback type="invalid">
                    Please input a valid topic name
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" className="btn btn-block">Save</Button>
            </Form>
        </div>
    )
}

export default Profile
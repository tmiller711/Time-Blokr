import React from "react"
import { useState, useEffect } from "react"

const Profile = ({ getCookie }) => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

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

    }

    return (
        <form onSubmit={onSubmit}>
            <div className='form-control' onChange={(e) => setName(e.target.value)}>
                <label>Name</label>
                <input type="text" value={name}></input>
            </div>
            <div className='form-control' onChange={(e) => setPhoneNumber(e.target.value)}>
                <label>Phone Number</label>
                <input type="text" value={phoneNumber}></input>
            </div>

            <input type="submit" value="Save" className="btn btn-block" />
        </form>


    )
}

export default Profile
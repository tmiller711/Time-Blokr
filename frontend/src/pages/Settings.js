import React from "react"
import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/settings.css"

const Settings = ({ getCookie }) => {
    const [timezone, setTimezone] = useState('')
    const [wakeUpTime, setWakeUpTime] = useState('')
    const [bedtime, setBedtime] = useState('')

    useEffect(() => {
      const getAccountSettings = async () => {
        const accountSettings = await fetchAccountSettings()
        // update the timezone and such
        setTimezone(accountSettings.timezone)
        setWakeUpTime(accountSettings.wake_up_time)
        setBedtime(accountSettings.bedtime)
      }

      getAccountSettings()
    }, [])

    const onSubmit = async (e) => {
      e.preventDefault()
      const csrftoken = getCookie('csrftoken');

      const res = await fetch('/api/account/settings', {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          timezone: timezone,
          wake_up_time: wakeUpTime,
          bedtime: bedtime
        })
      })

      const data = await res.json()

    }

    const fetchAccountSettings = async () => {
      const res = await fetch('/api/account/settings')
      const data = await res.json()

      return data
    }

    return (
      <div className="settings">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Timezone</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setTimezone(e.target.value)}>
                <option value="America/Chicago">America/Chicago</option>
                <option value="America/New_York">America/New York</option>
                <option value="America/Denver">America/Denver</option>
                <option value="America/Los_Angeles">America/Los Angeles</option>
              </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Wake Up Time</Form.Label>
              <Form.Control
                  type="time"
                  onChange={(e) => setWakeUpTime(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bedtime</Form.Label>
              <Form.Control
                  type="time"
                  onChange={(e) => setBedtime(e.target.value)}
              />
          </Form.Group>

          <Button type='submit' className="btn btn-block">Save</Button>
        </Form>
      </div>
    )
}

export default Settings
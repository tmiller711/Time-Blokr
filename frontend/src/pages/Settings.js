import React from "react"
import { useState, useEffect } from "react"

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

      const res = await fetch('/api/account/updatesettings', {
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
      const res = await fetch('/api/account/getsettings')
      const data = await res.json()

      return data
    }

    return (
      <form onSubmit={onSubmit}>
          <div className='form-control' onChange={(e) => setTimezone(e.target.value)}>
            <label>Timezone</label>
            <select name="timezone" value={timezone}>
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/New_York">America/New York</option>
              <option value="America/Denver">America/Denver</option>
              <option value="America/Los_Angeles">America/Los Angeles</option>
            </select>
          </div>
          <div className='wake-up-time' onChange={(e) => setWakeUpTime(e.target.value)}>
            <label>Wake Up Time</label>
            <input type="time" name="wake_up_time" value={wakeUpTime}></input>
          </div>
          <div className='bedime' onChange={(e) => setBedtime(e.target.value)}>
            <label>Bedtime</label>
            <input type="time" name="bedtime" value={bedtime}></input>
          </div>
          <input type='submit' value='Save' className="btn btn-block"/>
      </form>
    )
}

export default Settings
import React, { useEffect, useState } from "react";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import '../css/sidenav.css';

const SideNav = (props) => {
    const navigate = useNavigate();
    const [time, setTime] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const getAccountSettings = async () => {
            const res = await fetch('/api/account/getuser')
            const data = await res.json()

            setUsername(data.username)
            setName(data.name)
        }

        // const getTime = async () => {
        //     const res = await fetch('/api/gettime')
        //     const data = await res.json()
    
        //     setTime(data.time)
        // }

        getTime()
        getAccountSettings()
        // getTime()
    }, [])

    const changeSideNavClass = () => {
        let sideNav = document.querySelector(".sidenav");
        sideNav.classList.toggle("active");
    }

    const changeSearchClass = () => {
        let searchBtn = document.querySelector(".bx-search");
        searchBtn.classList.toggle("active");
    }

    const getTime = async () => {
        console.log("getting time")
        const res = await fetch('/api/gettime')
        const data = await res.json()

        setTime(data.time)

        setTimeout(() => {
            getTime()
        }, 30000)
    }

    return (
        <>
        <div className="sidenav">
            <div className="logo_content">
                <div className="logo">
                    <i class='bx bxl-c-plus-plus'></i>
                    <div className="logo_name">TimeBlokr</div>
                </div>
                <i class='bx bx-menu' id="btn" onClick={changeSideNavClass}></i>
            </div>
            <div className="time">
                <h1>{time}</h1>
            </div>
            <ul className="nav_list">
                <li>
                    <i class="bx bx-search" onClick={changeSearchClass}></i>
                    <input type="text" placeholder="Search..."></input>
                    <span class="tooltip">Search</span>
                </li>
                <li>
                    <Link to="/">
                        <i class="bx bx-grid-alt"></i>
                        <span class="links_name">Dashboard</span>
                    </Link>
                    <span class="tooltip">Dashboard</span>
                </li>
                <li>
                    <Link to="/profile">
                        <i class="bx bx-user"></i>
                        <span class="links_name">Profile</span>
                    </Link>
                    <span class="tooltip">Profile</span>
                </li>
                <li>
                    <Link to="/settings">
                        <i class="bx bx-chat"></i>
                        <span class="links_name">Settings</span>
                    </Link>
                    <span class="tooltip">Settings</span>
                </li>
            </ul>
            <div className="profile_content">
                <div className="profile">
                    <div className="profile_details">
                        {/* figure out how to get static files */}
                        <img src="static/images/test.png"></img>
                        <div className="name_job">
                            <div className="name">{name}</div>
                            <div className="job">{username}</div>
                        </div>
                    </div>
                    <a href="/logout">
                        <i class='bx bx-log-out' id="log_out" color="white"></i>
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}

export default SideNav
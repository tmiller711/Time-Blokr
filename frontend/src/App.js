import React, { Component } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { render } from "react-dom";
import SideNav from "./components/SideNav";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Day from "./pages/Day"

function App() {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
        }

    const getCurTime = () => {
        var today = new Date();
        let hour = today.getHours()
        let minutes = today.getMinutes()

        if (minutes < 10) {
            minutes = `0${minutes}`
        }

        let pmAM = ""
        hour >= 12 ? pmAM="PM" : pmAM="AM"
        hour > 12 ? hour=hour-12 : null
        hour == 0 ? hour = 12:null
        
        return (hour + ":" + minutes + pmAM)
    }

    return (
        <>
            <Routes>
                <Route element={<WithoutNav />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<WithNav getCurTime={getCurTime}/>}>
                    <Route path="/" element={<Day getCookie={getCookie} getCurTime={getCurTime} />} />
                    <Route path="/profile" element={<Profile getCookie={getCookie} />} />
                    <Route path="/settings" element={<Settings getCookie={getCookie} />} />
                </Route>
            </Routes>
        </>
    )

}

export default App;
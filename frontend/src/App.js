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

    return (
        <>
            <Routes>
                <Route element={<WithoutNav />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<WithNav />}>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/profile" element={<Profile getCookie={getCookie} />} />
                    <Route path="/settings" element={<Settings getCookie={getCookie} />} />
                </Route>
            </Routes>
        </>
    )

}

export default App;
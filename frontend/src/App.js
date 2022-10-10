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

    return (
        <>
            <Routes>
                <Route element={<WithoutNav />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<WithNav />}>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </>
    )

}

export default App;
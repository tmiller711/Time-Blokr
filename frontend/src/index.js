import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import '../static/css/main.css';
import "../static/css/registration.css"
import "../static/css/day.css"
import "../static/css/settings.css"
import "../static/css/profile.css"
import "../static/css/registration.css"
import '../static/css/sidenav.css';
import "../static/css/blocks.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
)
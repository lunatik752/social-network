import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Avatar from "./components/Avatar";
import PersonalInfo from "./components/PersonalInfo";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Avatar/>
            <PersonalInfo/>
            <Navbar/>
            <Profile/>
        </div>
    );
}

export default App;

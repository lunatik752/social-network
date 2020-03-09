import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Avatar from "./components/Avatar/Avatar";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

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

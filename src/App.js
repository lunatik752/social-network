import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Avatar from "./components/Avatar";
import PersonalInfo from "./components/PersonalInfo";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Avatar/>
            <PersonalInfo/>
            <nav className='nav'>
                <div>
                    <a>Profile</a>
                </div>
                <div>
                    <a>News</a>
                </div>
                <div>
                    <a>Messages</a>
                </div>
                <div>
                    <a>Music</a>
                </div>
                <div>
                    <a>Settings</a>
                </div>
            </nav>
            <div className='content'>
                <div>
                    My posts
                    <div>
                        New posts
                    </div>
                    <div>
                        <div>
                            post 1
                        </div>
                        <div>
                            post 2
                        </div>
                        <div>
                            post 3
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

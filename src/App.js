import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className='app-wrapper'>
            <header className='header'>
                <img src='https://cdn2.vectorstock.com/i/1000x1000/48/46/guitar-logo-vector-10784846.jpg' alt='logo'/>
            </header>
            <div className='avatar'>
                <img src='https://semantica.in/wp-content/uploads/2018/08/av-427845.png' alt='my photo'/>
            </div>
            <div className='personalInfo'>
                personal information
            </div>
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

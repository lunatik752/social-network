import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import PropTypes from 'prop-types';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import PhotosContainer from "./components/Photos/PhotosContainer";


function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/profile'
                       render={() => <Profile/>}/>
                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}/>
                <Route path='/photos'
                       render={() => <PhotosContainer/>}/>
                <Route path='/news' component={() => <News/>}/>
                <Route path='/music' component={() => <Music/>}/>
                <Route path='/settings' component={() => <Settings/>}/>
                <Route path='/users' component={() => <UsersContainer/>}/>
            </div>
        </div>
    );
}

export default App;

App.propTypes = {
    state: PropTypes.object
};
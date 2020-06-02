import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import PhotosContainer from "./components/Photos/PhotosContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReduсer";
import Loading from "./common/Loading/Loading";


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }


    render() {

        if (!this.props.initialized) {
            return (
                <div className='appLoad'>
                    <Loading/>
                </div>
            )
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route
                        path='/profile/:userId?'    // Вопросительный знак в пути означает что параметр опциональный. Его может не быть.
                        render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>
                    <Route path='/photos'
                           render={() => <PhotosContainer/>}/>
                    <Route path='/news' component={() => <News/>}/>
                    <Route path='/music' component={() => <Music/>}/>
                    <Route path='/settings' component={() => <Settings/>}/>
                    <Route path='/users' component={() => <UsersContainer/>}/>
                    <Route path='/login' component={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);





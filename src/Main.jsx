import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReduсer";
import Loading from "./common/Loading/Loading";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const PhotosContainer = React.lazy(() => import('./components/Photos/PhotosContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));


class Main extends React.Component {

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
                    <Route exact path={'/'} render={() => <Redirect to={'/profile/:userId?'}/>}/>
                    <Route
                        path='/profile/:userId?'    // Вопросительный знак в пути означает что параметр опциональный. Его может не быть.
                        render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/photos'
                           render={withSuspense(PhotosContainer)}/>
                    <Route path='/news' component={withSuspense(News)}/>
                    <Route path='/music' component={withSuspense(Music)}/>
                    <Route path='/settings' component={() => <Settings/>}/>
                    <Route path='/users' component={withSuspense(UsersContainer)}/>
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
    connect(mapStateToProps, {initializeApp}))(Main);





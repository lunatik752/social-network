import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReduсer";
import Loading from "./common/Loading/Loading";
import {withSuspense} from "./hoc/withSuspense";
import {AppRootStateType} from "./redux/store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const PhotosContainer = React.lazy(() => import('./components/Photos/PhotosContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));


type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    initializeApp: () => void
}

class Main extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>  {
        alert('Some error occurred');
        // console.log(promiseRejectionEvent);
    }

    componentDidMount() {

        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to={'/profile/:userId?'}/>}/>
                        <Route
                            path='/profile/:userId?'    // Вопросительный знак в пути означает что параметр опциональный. Его может не быть.
                            render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/photos'
                               render={withSuspense(PhotosContainer)}/>
                        <Route path='/news' render={withSuspense(News)}/>
                        <Route path='/music' render={withSuspense(Music)}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={withSuspense(UsersContainer)}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
});

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(Main);





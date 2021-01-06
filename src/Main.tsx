import React from 'react';
import './App.css';
import {
    CHAT_PATH,
    DEVELOPERS_PATH,
    DIALOGS_PATH,
    MUSIC_PATH,
    NEWS_PATH,
    PHOTO_PATH,
    PROFILE_PATH,
    SETTINGS_PATH
} from "./components/Navbar/Navbar";
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReduсer";
import Loading from "./common/Loading/Loading";
import {withSuspense} from "./hoc/withSuspense";
import {AppRootStateType} from "./redux/store";
import {UsersPage} from "./components/Users/UsersPage";
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined, NotificationOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/Header/Header";
import {Dialogs} from "./components/Dialogs/Dialogs";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

const PhotosContainer = React.lazy(() => import('./components/Photos/PhotosContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))


type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(Dialogs)
const SuspendedPhotos = withSuspense(PhotosContainer)
const SuspendedChatPage = withSuspense(ChatPage)


class Main extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred');
        console.log(e);
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
            <Layout>
                <AppHeader/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                <Menu.Item key="1"><Link to={PROFILE_PATH}>Profile</Link></Menu.Item>
                                <Menu.Item key="2"> <Link to={DIALOGS_PATH}>Messages</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title='Developers'>
                                <Menu.Item key="3"><Link to={DEVELOPERS_PATH}>Developers</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                <Menu.Item key="4"> <Link to={CHAT_PATH}>Chat</Link></Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route exact path={'/'} render={() => <Redirect to={'/profile/:userId?'}/>}/>
                                <Route
                                    path='/profile/:userId?'    // Вопросительный знак в пути означает что параметр опциональный. Его может не быть.
                                    render={() => <ProfileContainer/>}/>
                                <Route path={DIALOGS_PATH}
                                       render={() => <SuspendedDialogs/>}/>
                                <Route path={PHOTO_PATH}
                                       render={() => <SuspendedPhotos/>}/>
                                <Route path={NEWS_PATH} render={withSuspense(News)}/>
                                <Route path={MUSIC_PATH} render={withSuspense(Music)}/>
                                <Route path={SETTINGS_PATH} render={() => <Settings/>}/>
                                <Route path={DEVELOPERS_PATH} render={() => <UsersPage/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path={CHAT_PATH} render={() => <SuspendedChatPage/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
});

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(Main);





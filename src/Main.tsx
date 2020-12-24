import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReduсer";
import Loading from "./common/Loading/Loading";
import {withSuspense} from "./hoc/withSuspense";
import {AppRootStateType} from "./redux/store";
import {UsersPage} from "./components/Users/UsersPage";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const PhotosContainer = React.lazy(() => import('./components/Photos/PhotosContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));



type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedPhotos= withSuspense(PhotosContainer)


class Main extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>  {
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
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
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
                                <Route path='/dialogs'
                                       render={() => <SuspendedDialogs/>}/>
                                <Route path='/photos'
                                       render={() => <SuspendedPhotos/>}/>
                                <Route path='/news' render={withSuspense(News)}/>
                                <Route path='/music' render={withSuspense(Music)}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/users' render={() => <UsersPage/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
          /*  <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to={'/profile/:userId?'}/>}/>
                        <Route
                            path='/profile/:userId?'    // Вопросительный знак в пути означает что параметр опциональный. Его может не быть.
                            render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs/>}/>
                        <Route path='/photos'
                               render={() => <SuspendedPhotos/>}/>
                        <Route path='/news' render={withSuspense(News)}/>
                        <Route path='/music' render={withSuspense(Music)}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersPage/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>*/
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
});

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(Main);





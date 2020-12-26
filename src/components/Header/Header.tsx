import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authReduсer";
import {Avatar, Col, Layout, Menu, Row, Button} from "antd";
import {DEVELOPERS_PATH} from "../Navbar/Navbar";
import {UserOutlined} from "@ant-design/icons";
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/authSelectors';
import style from './Header.module.css'

const {Header} = Layout;


type PropsType = {}

export const AppHeader: React.FC<PropsType> = React.memo(() => {

        const isAuth = useSelector(selectIsAuth)
        const login = useSelector(selectCurrentUserLogin)
        const dispatch = useDispatch()


        const onClickHandler = useCallback(() => {
            dispatch(logout())
        }, [])


        return (

            <Header className="header">
                <div className="logo"/>
                <Row>
                    <Col span={18}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1"><Link to={DEVELOPERS_PATH}>Developers</Link></Menu.Item>
                        </Menu>
                    </Col>

                    {isAuth
                        ? <>
                            <Col span={1}>
                                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={2}>
                                <span className={style.currentUserLogin}>{login}</span>
                            </Col>
                            <Col span={2}>
                                <Button onClick={onClickHandler}>Log out</Button>
                            </Col>
                        </>
                        : <Col span={6}> <Link to={'/login'}>Login</Link> </Col>}
                </Row>
            </Header>

        )
    }
);


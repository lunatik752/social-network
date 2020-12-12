import React, {ReactNode} from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType ={
    isAuth: boolean
    login: string | null
    logout: () => void
    children?: ReactNode

}

const Header: React.FC<PropsType> = ({isAuth, login, logout}) => {
    return (
        <header className={styles.header}>
            <img src='https://cdn2.vectorstock.com/i/1000x1000/48/46/guitar-logo-vector-10784846.jpg' alt='logo'/>
            <div className={styles.loginBlock}>
                {isAuth
                    ? <div>{login} - <button onClick={logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
};

export default Header;


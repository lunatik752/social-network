import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (
        <header className={styles.header}>
            <img src='https://cdn2.vectorstock.com/i/1000x1000/48/46/guitar-logo-vector-10784846.jpg' alt='logo'/>

            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>


        </header>
    )
};

export default Header;


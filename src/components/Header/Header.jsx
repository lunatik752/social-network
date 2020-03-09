import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img src='https://cdn2.vectorstock.com/i/1000x1000/48/46/guitar-logo-vector-10784846.jpg' alt='logo'/>
        </header>
    )
};

export default Header;
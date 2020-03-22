import React from 'react';
import s from './Header.module.css';
import PropTypes from "prop-types";
import Dialogs from "../Dialogs/Dialogs";

const Header = () => {
    return (
        <header className={s.header}>
            <img src='https://cdn2.vectorstock.com/i/1000x1000/48/46/guitar-logo-vector-10784846.jpg' alt='logo'/>
        </header>
    )
};

export default Header;

// Header.propTypes = {
//     state: PropTypes.object
// };
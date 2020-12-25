import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";


export const PROFILE_PATH = '/profile'
export const NEWS_PATH = '/news'
export const PHOTO_PATH = '/photo'
export const DIALOGS_PATH = '/dialogs'
export const MUSIC_PATH = '/music'
export const SETTINGS_PATH = '/settings'
export const DEVELOPERS_PATH = '/developers'


export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={PROFILE_PATH} activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={NEWS_PATH} activeClassName={s.active}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PHOTO_PATH} activeClassName={s.active}>Photos</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={DIALOGS_PATH} activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={MUSIC_PATH} activeClassName={s.active}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={SETTINGS_PATH} activeClassName={s.active}>Settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={DEVELOPERS_PATH} activeClassName={s.active}>Users</NavLink>
            </div>
        </nav>
    )
}


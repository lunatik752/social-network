import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to='/dialogs/1'>Maks</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/2'>Aleks</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/3'>Kna</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/4'>Andy</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/5'>Cat</NavLink>
                </div>
            </div>
            <div className={s.messagesItem}>
                <div className={s.message}>
                    Hello!
                </div>
                <div className={s.message}>
                    How are you? What are you doing?
                </div>
                <div className={s.message}>
                    Come with me.
                </div>
            </div>
        </div>
    )
};

export default Dialogs;
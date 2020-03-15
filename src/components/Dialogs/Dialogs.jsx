import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


const DialogsItem = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
};

const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
};

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <DialogsItem name='Maks' id='1'/>
                <DialogsItem name='Aleks' id='2'/>
                <DialogsItem name='Kna' id='3'/>
                <DialogsItem name='Andy' id='4'/>
                <DialogsItem name='Cat' id='5'/>

            </div>
            <div className={s.messagesItem}>
                <Message message='Hello!'/>
                <Message message='How are you? What are you doing?!'/>
                <Message message='Come with me.'/>
            </div>
        </div>
    )
};

export default Dialogs;
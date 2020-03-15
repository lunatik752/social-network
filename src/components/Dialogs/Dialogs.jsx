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

    let dialogs = [
        {name: 'Maks', id: '1'},
        {name: 'Aleks', id: '2'},
        {name: 'Kna', id: '3'},
        {name: 'Andy', id: '4'}
    ];
let dialogsElements = dialogs.map( d => <DialogsItem name={d.name} id={d.id}/>);

    let messages = [
        {message: 'Hello!', id: '1'},
        {message: 'How are you? What are you doing?!', id: '2'},
        {message: 'Come with me.', id: '3'},
    ];
let messagesElements = messages.map(m => <Message message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messagesItem}>
                {messagesElements}
            </div>
        </div>
    )
};

export default Dialogs;
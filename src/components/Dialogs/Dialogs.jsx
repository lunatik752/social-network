import React from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogsItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogsPage.dialogs.map(d => <DialogsItem name={d.name} id={d.id}/>);

    let messagesElements = props.state.dialogsPage.messages.map(m => <Message message={m.message}/>);

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
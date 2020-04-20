import React from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogsItem from "./DialogItem/DialogItem";
import PropTypes from 'prop-types';




const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message}/>);
    let newMessageText = state.newMessageText


    let onAddMessage = () => {
        props.addMessage();
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    };


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messagesItem}>
                {messagesElements}
                <div className={s.newMessage}>
                    <div>
                        <textarea onChange={onMessageChange}
                                  value={newMessageText}> </textarea>
                    </div>
                    <div>
                        <button onClick={onAddMessage}>Send message</button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Dialogs;

Dialogs.propTypes = {
    state: PropTypes.object
};
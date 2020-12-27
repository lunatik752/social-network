import React from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogsItem from "./DialogItem/DialogItem";
import {dialogsActions} from "../../redux/dialogsReduсer";
import {AddMessageReduxForm} from "./AddMessageForm";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogsPage} from "../../redux/dialogsSelectors";

type DialogsPropsType = {}

export const Dialogs: React.FC<DialogsPropsType> = React.memo(() => {

    const dialogsPage = useSelector(selectDialogsPage)
    const dispatch = useDispatch()

    let dialogsElements = dialogsPage.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);


    let addNewMessage = (values: NewMessageFormDataType) => {
        dispatch(dialogsActions.addMessage(values.newMessageBody));
    };


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messagesItem}>
                {messagesElements}
            </div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    )
});


export type NewMessageFormDataType = {
    newMessageBody: string
}



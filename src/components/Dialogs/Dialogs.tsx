import React from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogsItem from "./DialogItem/DialogItem";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {DialogReducerInitialStateType} from "../../redux/dialogsReduсer";

type DialogsPropsType = {
    dialogsPage: DialogReducerInitialStateType
    addMessage: (newMessageBody: string) => void
}

const Dialogs = (props: DialogsPropsType) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);


    let addNewMessage = (newMessageBody: string) => {
        props.addMessage(newMessageBody);
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
};


const maxLength50 = maxLengthCreator(50);

type AddMessageFormPropsType = {
    handleSubmit: () => void
}

const AddMessageForm = (props: AddMessageFormPropsType) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name='newMessageBody'
                       placeholder='Enter your message'
                       validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<any, any>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;


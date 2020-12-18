import React from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogsItem from "./DialogItem/DialogItem";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {DialogReducerInitialStateType} from "../../redux/dialogsReduсer";

type DialogsPropsType = {
    dialogsPage: DialogReducerInitialStateType
    addMessage: (newMessageBody: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);


    let addNewMessage = (values: NewMessageFormDataType) => {
        props.addMessage(values.newMessageBody);
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


export type NewMessageFormDataType = {
    newMessageBody: string
}

type PropsType = {}

type NewMessageFormDataTypeKeys = Extract<keyof NewMessageFormDataType, string>

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormDataType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormDataTypeKeys>('Enter your message', 'newMessageBody', Input, [required, maxLength50])}

            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<NewMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;


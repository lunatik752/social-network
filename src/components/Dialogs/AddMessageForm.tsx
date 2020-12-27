import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {NewMessageFormDataType} from "./Dialogs";

const maxLength50 = maxLengthCreator(50);
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
export const AddMessageReduxForm = reduxForm<NewMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

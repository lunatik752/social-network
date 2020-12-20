import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../../common/FormsControl/FormsControl";
import styles from './PersonalInfo.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../../common/FormsControl/FormsControl.module.css";
import {ProfileType} from "../../../types/types";


type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.formSummeryControl}>
                {error}
            </div>}
            <div>
                <b>Name:</b> {createField<ProfileTypeKeys>('Full name', 'fullName', Input, [])}
                <b>About me:</b>
                {createField<ProfileTypeKeys>('About me', 'aboutMe', Textarea, [])}
            </div>

            <div>
                <b>Looking for a job:</b>
                {createField<ProfileTypeKeys>('', 'lookingForAJob', Input, [],{type: 'checkbox'})}
            </div>

            <div>
                <b>My professional skills:</b>
                {createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>

            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div className={styles.contact} key={key}>
                    <b>{key}: </b> {createField(key, 'contacts.' + key, Input, [])}

                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm

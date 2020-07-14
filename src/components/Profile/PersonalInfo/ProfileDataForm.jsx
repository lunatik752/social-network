import React from "react";
import {createField, Input, Textarea} from "../../../common/FormsControl/FormsControl";
import styles from './PersonalInfo.module.css';
import {reduxForm} from "redux-form";
import style from "../../../common/FormsControl/FormsControl.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.formSummeryControl}>
                {error}
            </div>}
            <div>
                <b>Name:</b> {createField('Full name', 'fullName', Input, [])}
                <b>About me:</b>
                {createField('About me', 'aboutMe', Textarea, [])}
            </div>

            <div>
                <b>Looking for a job:</b>
                {createField('', 'lookingForAJob', Input, [],{type: 'checkbox'})}
            </div>

            <div>
                <b>My professional skills:</b>
                {createField('My professional skills', 'lookingForAJobDescription', Textarea, [])}
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

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm
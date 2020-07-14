import React, {useState} from 'react';
import styles from './PersonalInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";


const PersonalInfo = ({profile, updateStatus, status, isOwner, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);
    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData) => {
        saveProfile(formData)
            .then(
                () => {
                    setEditMode(false)
                }
            )
    }


    return (
        <div className={styles.personalInfo}>
            {editMode
                ? <ProfileDataForm profile={profile}
                                   initialValues={profile}
                                   onSubmit={onSubmit}/>
                : <ProfileData profile={profile}
                               isOwner={isOwner}
                               goToEditMode={goToEditMode}
                />}
            <ProfileStatusWithHooks updateStatus={updateStatus}
                                    status={status}/>

        </div>
    )
};


const Contact = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}: </b>{contactValue}
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (

        <div className={styles.profileData}>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div>
                <p>Name: <span>{profile.fullName}</span></p>
            </div>

            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>

            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>

            {profile.lookingForAJob && <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>}

            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

export default PersonalInfo;


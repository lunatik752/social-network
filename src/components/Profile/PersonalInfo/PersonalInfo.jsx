import React from 'react';
import styles from './PersonalInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const PersonalInfo = ({profile, updateStatus, status}) => {
    return (
        <div className={styles.personalInfo}>
            <ProfileData profile={profile}/>
            <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>

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

const ProfileData = ({profile}) => {
    return (
        <div className={styles.profileData}>
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


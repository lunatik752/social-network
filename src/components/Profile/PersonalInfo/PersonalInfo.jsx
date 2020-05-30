import React from 'react';
import styles from './PersonalInfo.module.css';
import ProfileStatus from "./ProfileStatus";

const PersonalInfo = (props) => {
    return (
        <div className={styles.personalInfo}>
            <p>Name: <span>{props.profile.fullName}</span> </p>
            {/*<p>status: <span>{props.profile.aboutMe}</span></p>*/}
            <ProfileStatus/>

        </div>
    )
};

export default PersonalInfo;


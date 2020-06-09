import React from 'react';
import styles from './PersonalInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const PersonalInfo = (props) => {
    return (
        <div className={styles.personalInfo}>
            <p>Name: <span>{props.profile.fullName}</span> </p>
            <ProfileStatusWithHooks updateStatus={props.updateStatus} status={props.status}/>

        </div>
    )
};

export default PersonalInfo;

